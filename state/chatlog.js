let InMemoryList = require('../base/containers/list');

module.exports = ChatLog;

function ChatLog() {
    this.add({ from: 'Luke', message: 'Hey, anyone there?' });

    return this;
}

ChatLog.prototype = new InMemoryList();