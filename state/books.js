let InMemoryList = require('../base/containers/list');

module.exports = BookList;

function BookList() {
    this.add({ title: 'Ulysses', author: 'James Joyce', price: 18.99, cover: 'https://thegrownupya.files.wordpress.com/2012/02/peter-pan-jm-barrie-2.jpg' });
    this.add({ title: 'Hamlet', author: 'William Shakespeare', price: 0.35, cover: 'http://www.pagepulp.com/wp-content/54.jpg' });
    this.add({ title: 'The Odyssey', author: 'Homer', price: 24.99, cover: 'http://www.pagepulp.com/wp-content/13.jpg' });
    this.add({ title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 15.00, cover: 'https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG' });
    this.add({ title: 'Night', author: 'Elie Wiesel', price: 16.49, cover: 'http://i.dailymail.co.uk/i/pix/2008/09/30/article-1064747-0289D3C600000578-222_306x472.jpg' });
    this.add({ title: 'Amelia Bedelia Helps Out', author: 'Peggy Parish', price: 14.19, cover: 'http://www.scholastic.com/content5/media/products/18/9780688802318_xlg.jpg' });
    this.add({ title: 'The Lion, the Witch, and the Wardrobe', author: 'CS Lewis', price: 12.89, cover: 'https://images-na.ssl-images-amazon.com/images/I/51sQcUYpM9L._SX307_BO1,204,203,200_.jpg' });
    this.add({ title: 'Peter Pan', author: 'J. M. Barrie', price: 21.99, cover: 'https://writerchickanu.files.wordpress.com/2012/12/peter-pan-cover.jpg' });

    return this;
}

BookList.prototype = new InMemoryList();