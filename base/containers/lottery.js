module.exports = Lottery;

/**
 * An InMemoryList is an array wrapper that have add(), remove(), and getAll() .
 */
function Lottery() {
    this.options = {};

    return this;
}

Lottery.prototype.add = function (key, value) {
    if (this.options.hasOwnProperty(key)) this.options[key].push(value);
    else this.options[key] = [value];
};

Lottery.prototype.draw = function (key) {
    if (!this.options.hasOwnProperty(key)) throw Error(`Unknown key '${key}'`);

    let index = Math.floor(Math.random() * this.options[key].length);
    return this.options[key][index];
};

Lottery.prototype.count = function (key) {
    if (!this.options.hasOwnProperty(key)) return 0;

    return Object.keys(this.options).length;
}