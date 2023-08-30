var express = require('express');
var Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const MaticPOSClient = require('@maticnetwork/maticjs').POSClient
// import MaticPOSClient from '@maticnetwork/maticjs'
const { use } = require('@maticnetwork/maticjs')
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')

// install web3 plugin
use(Web3ClientPlugin)
var app = express();
var port = process.env.PORT || 3000;


async function approveandtransfer() {
    
    const privateKey = 'daacf807221af27adb38ecabd3fa2d2d38b73922a04287a316307cf9f9975909';
    
    const from = "0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce";
    const rootToken = "0x2c5271e203b6DCfFF9728CbDcb2F235E236B02ec"; //
    
    // the following RPC urls will change for mainnet.
    const parentProvider = new HDWalletProvider(privateKey, 'https://eth-goerli.g.alchemy.com/v2/822oQpZ5OrMUvLi2iGTTHHCuL0yABhe_');
    const maticProvider = new HDWalletProvider("a82039a42c16deb9446d4a5947f00bbddc2eac62eacb5ec586bcb3a3cf4e528f", 'https://rpc-mumbai.matic.today');
    
    
   
    // for mumbai testnet
    const maticPOSClient = new MaticPOSClient();
    
    //for mainnet
//    await maticPOSClient.init({
//     network: "testnet",
//     version: "mumbai",
//     parentProvider: parentProvider,
//     maticProvider: maticProvider
// })

await maticPOSClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: parentProvider,defaultConfig: {
        from : "0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce"
      }

    
    },
    child: {
      provider: maticProvider,
     
    }
});

    console.log("approve initiated");

    var amount = Web3.utils.toWei('0.1', 'ether');

    await maticPOSClient.approveERC20ForDeposit(rootToken, amount, { from: '0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce' });
    
    console.log("approve completed and transfer initiated");

    await maticPOSClient.depositERC20ForUser(rootToken, from, amount, {
        from: '0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce',
        gasPrice: "10000000000",
    });

    console.log("transfer complete");
}

approveandtransfer();

app.listen(port);
console.log('listening on');