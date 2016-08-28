/**
 */
let fortunes = [
    'do or do not',
    'there is no try',
    'depending how far beyond zebra you go',
    'think and wonder. wonder and think.',
    'its better to know how to learn than to know'
];

module.exports = {
    handler(request, reply, state) {
        let phrase = fortunes[Math.floor(Math.random() * fortunes.length)];

        reply({
            letters: phrase.split('').map(letter => state.fortunes.draw(letter)),
        });
    },
};