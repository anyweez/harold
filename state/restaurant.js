let next_food_id = 1;

function Food(name, description, price) {
    this.id = next_food_id++;
    this.name = name;
    this.description = description;
    this.price = price;
    this.available = true;

    return this;
}

function Restaurant() {
    this.orders = {};
    this.order_active = {};

    this.items = [
        new Food('Caesar Salad', 'An extraordinary mix of lettuce and croutons.', 8.99),
        new Food('Pickled Asparagus', 'A local favorite; just what it sounds like.', 11.39),
        new Food('Carrot Smoothie', 'Fresh from the garden.', 4.19),
    ];

    this.items[2].available = false;

    return this;
}

/* Add an order  */
Restaurant.prototype.add_to = function (table_id, item) {
    if (!this.exists(table_id)) {
        this.orders[table_id] = [];
        this.order_active[table_id] = true;
    }

    this.orders[table_id].push(this.get_item(item));
};

Restaurant.prototype.get_bill = function (table_id) {
    return this.orders[table_id];
}

/* Does order already exist? */
Restaurant.prototype.exists = function (table_id) {
    return this.orders.hasOwnProperty(table_id);
};

/* Check to see if the specified item exists; return if so */
Restaurant.prototype.get_item = function (id) {
    return this.items.find(i => i.id === id);
};

Restaurant.prototype.complete = function (table_id) {
    this.order_active[table_id] = false;
};

module.exports = Restaurant;