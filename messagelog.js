/* jslint node: true */
function MessageLog() {
    this.messages = [];
    this.nextId = 0;

    return this;
}

MessageLog.prototype.add = function (who, what) {
    this.messages.push({
        id: this.nextId++,
        user: who,
        message: what,
    });
};

MessageLog.prototype.fetch = function (options) {
    if (options.hasOwnProperty('start')) {
        return this.messages.filter(function (message) {
            return message.id >= options.hasOwnProperty('start');
        });
    } else {
        return this.messages;
    }
};


module.exports = (function () {
    return {
        new: function () {
            return new MessageLog();
        },
    };
}());