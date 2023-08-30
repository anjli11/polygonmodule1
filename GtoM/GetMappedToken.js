const { ethers } = require("hardhat");
const cont = require("./abiFX.json")
require("dotenv").config();

const contractAddress = process.env.GTOKEN_ADDRS;
async function batchMint() {
    // Connect to the  FXcontract
    const contractBBI = cont;
    const fxContract="0xF9bc4a80464E48369303196645e876c8C7D972de";

    const FXcontract = await ethers.getContractAt(contractBBI, fxContract);

    //This will Map the token to PolyGon Mumbai
    const tx = await FXcontract.rootToChildTokens(contractAddress);
    console.log(`Mapped token with hash: `,tx);
    // console.log(JSON.stringify(tx));
    




}

// Call the batchMint function
batchMint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

