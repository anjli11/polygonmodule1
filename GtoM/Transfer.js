const { ethers } = require("hardhat");
var prompt = require('prompt-sync')();

const cont = require("./abiFX.json")
require("dotenv").config();

const contractAddress = process.env.GTOKEN_ADDRS;//root address
async function Transfer() {

    // Connect to the deployed FXcontract
    const contractBBI = cont;
    const fxContract="0xF9bc4a80464E48369303196645e876c8C7D972de";
    const FXcontract = await ethers.getContractAt(contractBBI, fxContract);

    const userAddress = process.env.M_ADDRS //to this Account funds will be NFTS Will be transfered
    let k = 1;

    //this will transfer our 5 tokens from Goerli to mumbai
    while (k <= 5) {
        try {
            k;
            let tx = await FXcontract.deposit(contractAddress, userAddress, k, "0x6566");
            console.log(`Transaction Deatials For token ${k} are ${tx.hash}`);
            k++;
        } catch (e) {
            console.log(e);
        }
    }




}

// Call the Transfer function
Transfer()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

