const Boom = require('boom');

module.exports = {
    handler(request, reply, state) {
        request.payload = JSON.parse(request.payload);
        // console.log(request.payload.id);
        if (!request.payload.hasOwnProperty('id')) reply(Boom.badRequest('Must specify a word ID!'));
        else if (!request.payload.hasOwnProperty('guess')) reply(Boom.badRequest('Must specify a guess!'));
        else {
            let word = state.words.get(parseInt(request.payload.id));

            if (word !== undefined && request.payload.guess === word) {
                reply({
                    correct: true,
                    display: 'Nailed it!',
                });
            } else {
                reply({
                    correct: false,
                    display: 'That\'s not quite right...',
                })
            }
        }
    },
};