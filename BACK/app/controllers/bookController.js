const bookDataMapper = require('../models/book');
const { ApiError } = require('../middlewares/handleError');
const bookReformatter = require('../services/bookReformatter');
const getBooksByIdsTEMPORARY = require('../services/getBooksByIdsTEMPORARY');
const debug = require('debug')('bookController');

module.exports = {
    /**
     * Product controller to get all books in donation.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAllInDonation(req, res) {
        debug('GetAllInDonation')
        let books = await bookDataMapper.findAllInDonation();
        books = await bookReformatter.reformat(books, req.body.user);

        return res.json(books);
    },

    async getOneBookById(req, res) {
        const bookId = req.params.id;
        let book = await bookDataMapper.findOneBookById(bookId);
        if (!book) {
            throw new ApiError('Book not found', { statusCode: 404 });
        }
        book = await bookReformatter.reformat([book], req.body.user);

        return res.json(book);
    },

    /**
     * Book controller to add a book
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async addBook(req, res) {
        const savedUserHasBook = await bookDataMapper.updateOrInsert(req.body);

        let book = await bookDataMapper.findOneBookById(savedUserHasBook.book_id);
        book = await bookReformatter.reformat([book], req.body.user);

        return res.json(book);
    },

    /**
     * Book controller to add a book
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getBooksIdsAroundMe(req, res) {
        const booksAroundMe = await bookDataMapper.findBooksIdAround(req.body.location, req.body.radius);

        debug('BOOK AROUND ME', booksAroundMe);
        const result = [];
        const promiseToSolve=[];
        let bookArray=[];

        booksAroundMe.forEach(element=> {
            debug('book ids', element.book_ids);
            promiseToSolve.push(getBooksByIdsTEMPORARY.getBooksWithIdsTEMPORARY(element.book_ids));

        })
        let books = await Promise.all(promiseToSolve);
        debug('books après foreach', books);

        books = books[0].concat(books[1]);
        debug('books concat', books);


        booksAroundMe.forEach(element=> {
            debug('IDS à chercher', element.book_ids)
            element.book_ids.forEach(book_id => {
                debug('ID à chercher', book_id)
                let book= books.find(book =>
                    book_id===book.id
                 )
                 debug('book trouvé avec id', book)
                 bookArray.push({
                     ...book,
                 })
            })

            result.push({
                books : bookArray,
                loc: element.loc
            })
            bookArray=[];
            debug('bookArray', bookArray)
            debug('result dans forEach', result);
        })
        debug('result en dehors du forEach', result);


        return res.json(result);
    },



    async getBooksWithIds(req, res) {
        debug('Req.query.books = ', req.query.books);
        let bookIds = req.query.books
        bookIds = bookIds.substr(1).substr(0, bookIds.length - 2).split(',');
        debug('après traitement', bookIds);

        const promiseToSolve = [];
        bookIds.forEach(element => {
            promiseToSolve.push(bookDataMapper.findOneBookById(Number(element)));
        });


        //TODO : question : what happened si une promesse échoue ??
        debug('Je lance les promesses pour trouver les livres')
        let books = await Promise.all(promiseToSolve);
        debug('Les livres trouvés sont', books);
        //Without books undefined
        let newBooks=[];
        books.forEach(book=>{
            if(book) {
                newBooks.push(book);
        }
        });
        books=newBooks;


        debug('Les livres trouvés sans les undefined', books);

        debug('Je complete les infos avec API');

        debug('user connecté')
        books = await bookReformatter.reformat(books, req.body.user);

        debug('Livres complets', books);

       return res.json(books);

    }
};
