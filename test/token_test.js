const MyERC20 = artifacts.require('MyERC20');
const BigNumber = require('bignumber.js');

contract('MyERC20', (accounts) => {
    let token;
    const owner = accounts[0];
    const recipient = accounts[1];
    const decimalsMul = (new BigNumber(1).multipliedBy(1e+18)).toString(10);

    beforeEach(async () => {
        token = await MyERC20.new('CipherCoin', 'CC', 18, (new BigNumber(31337).multipliedBy(1e+18)).toString(10));
    });

    it('has correct totalSupply after construction', async () => {
        const actualSupply = await token.totalSupply();
        assert.equal(actualSupply.toString(), (new BigNumber(31337).multipliedBy(1e+18)).toString(10));
    });

    it('has correct token name after construction', async () => {
        const actualName = await token.name();
        assert.equal(actualName, 'CipherCoin');
    });

    it('has correct token symbol after construction', async () => {
        const actualSymbol = await token.symbol();
        assert.equal(actualSymbol, 'CC');
    });

    it('has correct token decimals after construction', async () => {
        const actualDecimals = await token.decimals();
        assert.equal(actualDecimals.toString(), '18');
    });

    it('has correct owner token balance after construction', async () => {
        const actualBalance = await token.balanceOf(owner);
        assert.equal(actualBalance.toString(), (new BigNumber(31337).multipliedBy(1e+18)).toString(10));
    });

    it('recipient and sender have correct balances after transfer', async () => {
        const tokenAmount = (new BigNumber(1).multipliedBy(1e+18)).toString(10);
        await token.transfer(recipient, tokenAmount);
        const actualSenderBalance = await token.balanceOf(owner);
        const actualRecipientBalance = await token.balanceOf(recipient);
        assert.equal(actualSenderBalance.toString(), (new BigNumber(31337 - 1).multipliedBy(1e+18)).toString(10));
        assert.equal(actualRecipientBalance.toString(), tokenAmount.toString());
    });

    it('emits Transfer event on transfer', async () => {
        const tokenAmount = (new BigNumber(1).multipliedBy(1e+18)).toString(10);
        const { logs } = await token.transfer(recipient, tokenAmount);
        const event = logs.find(e => e.event === 'Transfer');
        assert.notEqual(event, undefined);
    });
})
