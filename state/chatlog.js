let InMemoryList = require('../base/containers/list');

module.exports = ChatLog;

function ChatLog() {
    this.add({ from: 'Luke', message: 'Hey, anyone there?' });
    this.add({ from: 'Elsa the Snow Queen', message: 'Is there anybody out there?' });
    this.add({ from: 'Trogdor', message: 'IM HERE' });

    return this;
}

ChatLog.prototype = new InMemoryList();