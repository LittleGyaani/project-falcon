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

    _isChainvalid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock._calculateHash())
                return false;

            if (currentBlock.previousHash != previousBlock.hash)
                return false;
        }

        return true;
    }
}

//Craete my Crypto Coin
let falconCoin = new BlockChain();
falconCoin._addNewBlock(new Block(1, '20/04/2020', { amount: 5 }));
falconCoin._addNewBlock(new Block(2, '22/04/2020', { amount: 15 }));

//Check if Block Chain is valid
console.log('Is chain Valid?' + ' ' + falconCoin._isChainvalid());

//Chaning Block Chain Data
falconCoin.chain[2].data = { amount: 500 };

//Relog the Block Chain Validity
console.log('Is chain Valid?' + ' ' + falconCoin._isChainvalid());

// console.log(JSON.stringify(falconCoin, null, 5));