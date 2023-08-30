const { ethers } = require("hardhat");
const cont = require("./abiFX.json")
require("dotenv").config();
//1 update required
//Always make sure to update it
const contractAddress = process.env.GTOKEN_ADDRS;
async function batchMint() {
    // Connect to the  FXcontract
    const contractBBI = cont;
    const fxContract="0xF9bc4a80464E48369303196645e876c8C7D972de";

    const FXcontract = await ethers.getContractAt(contractBBI, fxContract);

    //This will Map the token to PolyGon Mumbai
    const tx = await FXcontract.mapToken(contractAddress);
    // console.log(JSON.stringify(tx));
     console.log(`Mapping Confirmed with hash: `,tx.hash);
    




}

// Call the batchMint function
batchMint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

