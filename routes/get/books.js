/**
 * @api {get} /books Get list of all available books
 * @apiName GetBooks
 * @apiGroup Books
 * 
 * @apiSuccess {Array} books    All available books
 */
module.exports = {
    handler(request, reply, state) {
        reply({
            books: state.books.getAll()
        });
    },
};