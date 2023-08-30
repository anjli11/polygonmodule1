const { ethers } = require("hardhat");
const contractAB = require("../artifacts/contracts/MyToken.sol/MyNFT.json");
require("dotenv").config();
//1 update required
//Always make sure to update it
const contractAddress = process.env.GTOKEN_ADDRS;
async function Approve() {
    // Connect to the deployed FXcontract
    const contractABI = contractAB.abi;
    const fxContract="0xF9bc4a80464E48369303196645e876c8C7D972de";
    const contract = await ethers.getContractAt(contractABI, contractAddress);
    //This will get approval for FxCOntract to transfer NFTS
    const tx = await contract.setApprovalForAll(fxContract,true);
     console.log(`Approval Confirmed with hash: `,tx.hash);

}

// Call the Approve function
Approve()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

