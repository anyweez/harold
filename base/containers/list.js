module.exports = InMemoryList;

/**
 * An InMemoryList is an array wrapper that have add(), remove(), and getAll() .
 */
function InMemoryList() {
    this.nextId = 0;
    this.list = [];
    this.exists = new Set();

    return this;
}

InMemoryList.prototype.add = function (item, unique = true) {
    if (!unique || !this.exists.has(JSON.stringify(item))) {
        this.exists.add(JSON.stringify(item));

        item.id = this.nextId++;
        this.list.push(item);
    } else {
        this.exists.add(JSON.stringify(item));
    }
};

InMemoryList.prototype.remove = function (id) {
    this.list = this.list.filter(item => item.id !== id);
};

InMemoryList.prototype.getAll = function () {
    return this.list;
};

InMemoryList.prototype.get = function (index) {
    return this.list[index];
}

InMemoryList.prototype.count = function () {
    return this.list.length;
}