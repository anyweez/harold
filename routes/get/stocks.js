
const NUM_TICKERS = 10;
/**
 * @api {get} /chats Get list of all available chat messages
 * @apiName GetChats
 * @apiGroup Chats
 * 
 * @apiSuccess {Array} chats    All available chat messages
 */
module.exports = {
    handler(request, reply) {
        let tickers = [];

        for (let i = 0; i < NUM_TICKERS; i++) {
            tickers.push({
                name: getName(),
                price: getValue(),
            });
        }

        reply({ tickers: tickers });
    },
};

function getName() {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I' ,'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let length = Math.ceil(Math.random() * 4) + 1;

    let name = [];
    for (let i = 0; i < length; i++) {
        name.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    
    return name.join('');
}

// Return a number from 1 - 500
function getValue() {
    return Math.ceil(Math.random() * 50000) / 100;
}