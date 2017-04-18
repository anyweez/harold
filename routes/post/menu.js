const Boom = require('boom');

module.exports = {
    path: '/menu/{menu_id}',

    handler(request, reply, state) {
        const payload = typeof(request.payload) === 'string' ?
            JSON.parse(request.payload) :
            request.payload;

        const menu_id = request.params.menu_id;

        if (!menu_id) reply(Boom.badRequest('Must specify a menu ID'));
        else {
            console.log(`Item #${menu_id}`);
            const item = state.restaurant.get_item(parseInt(menu_id));
            console.log(payload.available);
            console.log(item);

            item.name = payload.hasOwnProperty('name') ? payload.name : item.name;
            item.description = payload.hasOwnProperty('description') ? payload.description : item.description;
            item.price = payload.hasOwnProperty('price') ? payload.price : item.price;
            item.available = payload.hasOwnProperty('available') ? payload.available : item.available;

            console.log(item);
            reply();
        }
    },
};
