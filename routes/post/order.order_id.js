const Boom = require('boom');

module.exports = {
    path: '/order/{order_id}',
    handler(request, reply, state) {
        const payload = typeof(request.payload) === 'string' ?
            JSON.parse(request.payload) :
            request.payload;

        const order_id = request.params.order_id;

        if (!order_id) reply(Boom.badRequest('Must specify an order ID'));
        else if (!payload.hasOwnProperty('in_progress')) reply(Boom.badRequest('Body must specify in_progress'));
        else {
            state.restaurant.order_active[order_id] = payload.in_progress;
            reply();
        }
    },
};
