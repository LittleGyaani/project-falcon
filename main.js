const SHA256 = require('crypto-js/sha256'); //Import the SHA256 module

class Block { //Block for our Block Chain

    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this._calculateHash();
    }

    _calculateHash() { //This will calculate the hash out of the values
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

//Define the BlockChain
class BlockChain {

    constructor() {
        this.chain = [this._createGenesisBlock()];
    }

    _createGenesisBlock() {
        return new Block(0, '20/04/2020', 'genesis', '0');
    }

    _getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    _addNewBlock(newBlock) {
        newBlock.previousHash = this._getLatestBlock().hash;
        newBlock.hash = newBlock._calculateHash();
        this.chain.push(newBlock);
    }
}