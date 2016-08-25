let InMemoryList = require('../base/containers/list');

module.exports = WordList;

function WordList() {
    // Three-letter words
    this.add('hey');
    this.add('bit');
    this.add('irk');
    this.add('jar');

    // Four-letter words
    this.add('boat');
    this.add('moat');
    this.add('felt');
    this.add('body');
    this.add('info');
    this.add('jabs');
    this.add('lair');
    this.add('surf');
    this.add('swan');

    // Five-letter words
    this.add('frank');
    this.add('tamer');
    this.add('abate');
    this.add('abbot');
    this.add('abhor');
    this.add('abide');
    this.add('bison');
    this.add('blast');
    this.add('input');
    this.add('knock');
    this.add('patch');

    // Six-letter words
    this.add('abacus');
    this.add('biomes');
    this.add('indigo');
    this.add('insult');
    this.add('invest');
    this.add('period');
    this.add('trader');

    return this;
}

WordList.prototype = new InMemoryList();