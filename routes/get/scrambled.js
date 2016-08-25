const SCRAMBLE_ITERATIONS = 50;

function scramble(word) {
    let letters = word.split('');

    for (let i = 0; i < SCRAMBLE_ITERATIONS; i++) {
        let source = Math.floor(Math.random() * letters.length);
        let dest = Math.floor(Math.random() * letters.length);

        let temp = letters[dest];
        letters[dest] = letters[source];
        letters[source] = temp;
    }

    return letters.join('');
}
/**
 */
module.exports = {
    handler(request, reply, state) {
        let index = Math.floor(state.words.count() * Math.random());

        reply({
            id: index,
            scrambled: scramble(state.words.get(index)),
        });
    },
};