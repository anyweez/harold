const MIN_TRINKET_VALUE = 0;
const MAX_TRINKET_VALUE = 100;

function sliding(max) {
    let history = [];

    return {
        add(num) {
            history.push(num);

            if (history.length > max) history.shift();
        },

        get() {
            return history.reduce((a, b) => a + b, 0) / history.length;
        },
    };
}

const tracker = sliding(10);

setInterval(() => {
    const next = MIN_TRINKET_VALUE + Math.random() * (MAX_TRINKET_VALUE - MIN_TRINKET_VALUE);
    tracker.add(next);
}, 1000);

module.exports = {
    handler(request, reply, state) {

        reply({ exchange: tracker.get() });
    },
};