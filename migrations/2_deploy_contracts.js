const MyERC20 = artifacts.require('./MyERC20');
const BigNumber = require('bignumber.js');

module.exports = function(deployer) {
    return deployer.deploy(MyERC20, 'CipherCoin', 'CC', 18, (new BigNumber(31337).multipliedBy(1e+18)).toString(10));
};
