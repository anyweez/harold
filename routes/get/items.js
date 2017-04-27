const shuffle = require('shuffle-array');

const items_names = [
    'Basketball',
    'Soccer ball',
    'Baseball',
    'Volleyball',
    'Tennis ball'
];

const make_item = name => {
    return {
        name,
        x: Math.round(Math.random() * 20) - 10,
        y: Math.round(Math.random() * 20) - 10,
        found: false,
    };
};

module.exports = {
    handler(request, reply) {
        shuffle(items_names);

        reply(items_names.map(make_item));
    },
};