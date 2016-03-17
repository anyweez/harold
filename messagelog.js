/* jslint node: true */
function MessageLog(max) {
    this.messages = [];
    this.nextId = 0;
    this.maxMessages = max;

    return this;
}

MessageLog.prototype.add = function (who, what) {
    // Only hold up to this.maxMessages messages
    if (this.messages.length > this.maxMessages) {
        this.messages.shift();
    }

    this.messages.push({
        id: this.nextId++,
        user: who,
        message: what,
        when: new Date().toISOString(),
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
        new: function (max) {
            return new MessageLog(max);
        },
    };
}());