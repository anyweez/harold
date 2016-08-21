/* jslint node: true */
module.exports = function (state) {
    return {
        method: 'post',
        path: '/messages',
        handler: function (request, reply) {
            var content = JSON.parse(request.payload);
            // Create a new message.
            state.messages.add(content.user, content.message);
            console.log(new Date().toISOString() + '\tPOST /messages [' + content.message + ']');
            return reply();
        },
        config: {
            //        validate: {
            //            payload: {
            //                name: joi.string().required().min(3),
            //                message: joi.string().required().min(1),
            //            },
            //        },
            cors: {
                origin: ['*'],
            },
        },
    }
};
