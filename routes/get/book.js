/**
 * @api {get} /books Get list of all available books
 * @apiName GetBooks
 * @apiGroup Books
 * 
 * @apiSuccess {Array} books    All available books
 */
module.exports = {
    handler(request, reply, state) {
        let books = state.books.getAll();
        let i = Math.floor(Math.random() * books.length);

        reply(books[i]);
    },
};