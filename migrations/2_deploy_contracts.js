const MyTRC20 = artifacts.require('./MyTRC20');
const BigNumber = require('bignumber.js');

const config = require('config');

module.exports = function(deployer) {
    return deployer.deploy(MyTRC20, 'CipherCoin', 'CC', 18, (new BigNumber(31337).multipliedBy(1e+18)).toString(10));
};
