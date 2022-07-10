const requestAPIs = require('../services/requestAPIs');
const google = require('../services/google');
const worldCat = require('../services/worldCat');
const { ApiError } = require('../middlewares/handleError');
const bookReformatter = require('../services/bookReformatter');
const debug = require('debug')('apiController');

module.exports = {

    async getBookByISBN(req, res) {
        let connectedUserId;
        if (!req.body.user) {
            connectedUserId = 0;
        } else {
            connectedUserId = Number(req.body.user.userId);
        }

        const foundBook = await requestAPIs.findBookByISBN(req.params.isbn);
        if (!foundBook) {
            return res.json([]);
        }

        const book = await bookReformatter.reformat([foundBook], connectedUserId);
        return res.json(book[0]);
    },

    async getBookByKeyword(req, res) {
        let connectedUserId;
        if (!req.body.user) {
            connectedUserId = 0;
        } else {
            connectedUserId = Number(req.body.user.userId);
        }

        const keyWords = req.query.q;
        const limit = req.query.limit || 10; // limitation du nombre de résultat auprès de GoogleBooks API
        const page = req.query.start * limit || 0; // indication de l'index de démarrage souhaité auprès de GoogleBooks API

        const foundBooks = await google.findBookByKeyword(keyWords, limit, page);
        if (!foundBooks) {
            return res.json([]);
        }

        const books = await bookReformatter.reformat(foundBooks, connectedUserId);
        return res.json(books);
    },
};
