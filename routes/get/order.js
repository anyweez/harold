/**
 * @api {get} /chats Get list of all available chat messages
 * @apiName GetChats
 * @apiGroup Chats
 * 
 * @apiSuccess {Array} chats    All available chat messages
 */
module.exports = {
    handler(request, reply, state) {
        const orders = Object.keys(state.restaurant.orders).map(table => {
            return {
                table_id: table,
                items: state.restaurant.get_bill(table),
                in_progress: state.restaurant.order_active[table],
            };
        });

        reply(orders);
    },
};