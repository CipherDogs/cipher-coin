const HDWalletProvider = require('truffle-hdwallet-provider')
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')
const config = require('config')
const TestRPC = require('ganache-cli')

module.exports = {
    networks: {
        development: {
            provider: TestRPC.provider(),
            network_id: '*'
        },
        rinkeby: {
            provider: function () {
                let w = new HDWalletProvider(config.get('rinkeby.truffle.privateKey'), config.get('rinkeby.blockchain.rpc'))
                let nonceTracker = new NonceTrackerSubprovider()
                w.engine._providers.unshift(nonceTracker)
                nonceTracker.setEngine(w.engine)
                return w
            },
            network_id: config.get('rinkeby.blockchain.networkId'),
            gas: 4000000,
            gasPrice: 10000000000000
        },
        mainnet: {
            provider: function () {
                let w = new HDWalletProvider(config.get('mainnet.truffle.privateKey'), config.get('mainnet.blockchain.rpc'))
                let nonceTracker = new NonceTrackerSubprovider()
                w.engine._providers.unshift(nonceTracker)
                nonceTracker.setEngine(w.engine)
                return w
            },
            network_id: config.get('mainnet.blockchain.networkId'),
            gas: 2000000,
            gasPrice: 60000000000
        },
    },
    compilers: {
        solc: {
            version: '^0.5.0',
            settings: {
                optimizer: {
                    enabled: true
                }
            }
        }
    }
}
