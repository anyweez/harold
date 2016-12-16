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
        item.added = new Date().toString();

        this.list.push(item);
    } else {
        this.exists.add(JSON.stringify(item));
    }
};

/**
 * Remove by the specified properties.
 */
InMemoryList.prototype.remove = function (props) {
    function filter(item) {
        for (let prop in props) {
            console.log(`${item[prop]} vs. ${props[prop]}`);

            if (item[prop] === props[prop]) {
                return false;
            }
        }

        return true;
    }

    this.list = this.list.filter(item => filter(item));
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