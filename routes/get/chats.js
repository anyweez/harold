module.exports = {
    handler(request, reply, state) {
        reply(state.chatlog.getAll());
    },
};