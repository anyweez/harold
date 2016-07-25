/**
 * @api {get} /chats Get list of all available chat messages
 * @apiName GetChats
 * @apiGroup Chats
 * 
 * @apiSuccess {Array} chats    All available chat messages
 */
module.exports = {
    handler(request, reply, state) {
        reply({
            chats: state.chatlog.getAll(),
        });
    },
};