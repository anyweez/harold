const Boom = require('boom');

module.exports = {
    handler(request, reply, state) {
        const payload = typeof(request.payload) === 'string' ?
            JSON.parse(request.payload) :
            request.payload;

        if (!payload.table_id) reply(Boom.badRequest('Must specify a table ID'));
        else if (!payload.menu_id) reply(Boom.badRequest('Must specify a menu ID'));
        else {
            state.restaurant.add_to(payload.table_id, payload.menu_id);

            reply({
                table_id: payload.table_id,
                items: state.restaurant.get_bill(payload.table_id),
            });
        }
    },
};
