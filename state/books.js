let InMemoryList = require('../base/containers/list');

module.exports = BookList;

function BookList() {
    this.add({ title: 'Book 1', author: 'Author A' });
    this.add({ title: 'Book 2', author: 'Author B' });
    this.add({ title: 'Book 3', author: 'Author C' });

    return this;
}

BookList.prototype = new InMemoryList();