/**
 * @api {get} /chats Get list of all available chat messages
 * @apiName GetChats
 * @apiGroup Chats
 * 
 * @apiSuccess {Array} chats    All available chat messages
 */
module.exports = {
    handler(request, reply, state) {
        if (request.query.table_id) {
            const table = request.query.table_id;
            
            reply({
                table_id: table,
                items: state.restaurant.get_bill(table),
            });            
        } else {
            reply(Boom.badRequest('You must specify a valid table_id.'));
        }
    },
};