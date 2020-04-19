const SHA256 = require('');

class BlockChain {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    _calculateHash() { //This will calculate the hash


    }
}