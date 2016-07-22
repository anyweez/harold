/**
 * Reply with a list of all available books.
 */
module.exports = {
    handler(request, reply, state) {
        reply(state.books.getAll());
    },
};