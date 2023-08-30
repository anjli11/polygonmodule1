const { use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
const { FxPortalClient } = require("@fxportal/maticjs-fxportal");

const HDWalletProvider = require("@truffle/hdwallet-provider");

// add Web3Plugin

use(Web3ClientPlugin);

const fxPortalClient = new FxPortalClient();

await fxPortalClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
        provider: new HDWalletProvider(privateKey, rootRPC),
        defaultConfig: {
            from
        }
    },
    child: {
        provider: new HDWalletProvider(privateKey, childRPC),
        defaultConfig: {
            from
        }
    }
});
