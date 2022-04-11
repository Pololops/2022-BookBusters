const bookDataMapper = require('../models/book');
const bookReformatter = require('./bookReformatter');


 const getBooksWithIdsTEMPORARY = {
     async getBooksWithIdsTEMPORARY(bookIds) {

        const promiseToSolve = [];
        bookIds.forEach(element => {
            promiseToSolve.push(bookDataMapper.findOneBookById(Number(element)));
        });


        //TODO : question : what happened si une promesse échoue
        let books = await Promise.all(promiseToSolve);

        //Without books undefined
        let newBooks=[];
        books.forEach(book=>{
            if(book) {
                newBooks.push(book);
        }
        });
        books=newBooks;


        books = await bookReformatter.reformat(books);


       return books;

    },
}

    module.exports = getBooksWithIdsTEMPORARY;
