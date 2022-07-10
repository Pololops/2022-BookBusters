const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('process');
const userDataMapper = require('../models/user');
const google = require('../services/google');
const ApiError = require('../errors/apiError');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_LOGIN, //your gmail account you used to set the project up in google cloud console"
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
});

transporter.set('oauth2_provision_cb', (user, renew, callback) => {
    let accessToken = userTokens[user];
    if (!accessToken) {
        return callback(new Error('Unknown user'));
    } else {
        return callback(null, accessToken);
    }
});

const mailer = {
    async sendAlertingMails(users) {
        const promiseToSolve = [];
        users.forEach((user) => {
            // send mail with defined transport object
            promiseToSolve.push(
                transporter.sendMail({
                    from: `${process.env.EMAIL_ADDRESS}`, // sender address
                    to: `${user.email}`, // list of receivers
                    subject: 'Alerting mail', // Subject line
                    text: 'BookBusters', // plain text body
                    html: `<b>Cher(e) BookBuster</b><br><b>Le livre que vous recherchez est disponible au don en suivant le lien ci-dessous :</b><br><b>${process.env.BASE_URL}/book/isbn/${user.isbn13}</b><br><b>Bonne lecture !</b><br><b>L'équipe BookBusters</b>`, // html body
                }),
            );
        });

        await Promise.all(promiseToSolve);
    },

    async confirmationMail(user) {
        // confirmation email
        jwt.sign(
            {
                userId: user.id,
            },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: '1d' },
            (err, emailToken) => {
                const url = `${process.env.BASE_URL}/confirmation/${emailToken}`;
                try {
                    transporter.sendMail({
                        from: `${process.env.EMAIL_ADDRESS}`, // sender address
                        to: `${user.email}`,
                        subject: 'Confirmation de votre adresse email',
                        text: `Bienvenue sur BookBusters, ${user.username} ! Pour activer votre compte et vous connecter, nous devons d'abord vérifier votre adresse email. Veuillez cliquer sur ce lien pour confirmer votre email : ${url}`,
                        html: `Bienvenue sur BookBusters, ${user.username} !<br><br>Pour activer votre compte et vous connecter, nous devons d'abord vérifier votre adresse email.<br><br><a href=${url}>Veuillez cliquer sur ce lien pour confirmer votre email</a>`,
                    });
                } catch (err) {
                    console.log('je suis dans lerreur mail', err);
                    throw new ApiError('email not valid', { statusCode: 400 });
                }
            },
        );
    },

    async contactBookDonor(message) {
        try {
            await transporter.sendMail({
                from: `${process.env.EMAIL_ADDRESS}`, // sender address
                to: `${message.donor_email}`, // list of receivers
                subject: `${message.user_fullname} est interessé par votre livre ${message.book_title}`, // Subject line
                text: 'BookBusters', // plain text body
                html: `<b>Cher(e) BookBuster</b><br><b>${message.user_fullname} est interessé par votre livre ${message.book_title}. Voici son message :  ${message.message}. Vous pouvez le contacter par mail à l'adresse suivante : ${message.user_email} <br><b>L'équipe BookBusters</b>`, // html body
            });
        } catch (err) {
            throw new ApiError('email not valid', { statusCode: 400 });
        }
    },
};

// service mail every day at 2 am for the expired books.
cron.schedule('0 0 2 * *', async () => {
    // collect of the users with expired books, ie book in donation for more than 180 or 187 days
    const users = await userDataMapper.findUsersWithExpiredBook();
    if (users) {
        const expiredBook = [];
        users.forEach((user) => {
            if (user.isbn13) {
                expiredBook.push(google.findBookByISBN(user.isbn13));
            } else {
                expiredBook.push(google.findBookByISBN(user.isbn10));
            }
        });
        const books = await Promise.all(expiredBook);
        const promiseToSolve = [];
        users.forEach((user) => {
            const book = books.find(
                (book) => user.isbn13 === book.isbn13 || user.isbn10 === book.isbn10,
            );
            console.log(book, user);
            // send mail with defined transport object
            jwt.sign(
                {
                    bookId: user.book_id,
                    userId: user.id,
                },
                process.env.SECRET_TOKEN_KEY,
                { expiresIn: '2d' },
                (err, emailToken) => {
                    promiseToSolve.push(
                        transporter.sendMail({
                            from: `${process.env.EMAIL_ADDRESS}`, // sender address
                            to: `${user.email}`, // list of receivers
                            subject: 'Votre livre est-il toujours dispo ?', // Subject line
                            text: 'BookBusters', // plain text body
                            html: `<b>Cher(e) BookBuster,</b><br><b>Le livre "${book.title}" de "${book.author} est en donation chez BookBusters. Est il toujours disponible ? </b><br><b>Si le livre est toujours en donation, cliquez sur le lien suivant.</b><br><b>${process.env.BASE_URL}/donation/${emailToken}</b><br><b>Si le livre n'est plus dispo, pas de souci. Dans quelques jours le livre sera retiré automatiquement de notre site</b><br><b>Et surtout, n'hésitez pas à nous apporter d'autres livres sur BookBusters !</b><br><b>L'équipe BookBusters</b>`, // html body
                        }),
                    );
                },
            );
        });
        await Promise.all(promiseToSolve);
    }
});

module.exports = mailer;
