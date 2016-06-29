function HighScoreList(num) {
    this.max = num;
    this.scores = [];

    return this;
}

/**
 * Records should have a name, score, and playerType.
 */
HighScoreList.prototype.add = function (record) {
    this.scores.push(record);

    this.scores.sort((first, second) => {
        if (first.score < second.score) return 1;
        else return -1;
    });

    if (this.scores.length > this.max) this.scores.length = this.max;

    return (this.scores.find(x => x === record) !== undefined);
};

module.exports = (function () {
    return {
        new: function (max) {
            return new HighScoreList(max);
        },
    };
}());