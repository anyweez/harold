/**
 */
module.exports = {
    handler(request, reply, state) {
        let phrase = 'aloha';

        reply({
            letters: phrase.split('').map(letter => state.fortunes.draw(letter)),
        });
    },
};