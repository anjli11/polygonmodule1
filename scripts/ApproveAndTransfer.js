const { ethers } = require("hardhat");
var prompt = require('prompt-sync')();
const contractAB = require("../artifacts/contracts/MyToken.sol/MyNFT.json");

const cont = require("./abiFX.json")
const contractAddress = "0x2c5271e203b6DCfFF9728CbDcb2F235E236B02ec";
async function batchMint() {
    // Connect to the deployed FXcontract
    const contractABI = contractAB.abi;
    const contractBBI = cont;
    const fxContract="0xF9bc4a80464E48369303196645e876c8C7D972de";
    const contract = await ethers.getContractAt(contractABI, contractAddress);
    const FXcontract = await ethers.getContractAt(contractBBI, fxContract);

    //This will get approval for FxCOntract to transfer NFTS
    const tx = await contract.setApprovalForAll(fxContract,true);
     console.log(`Approval Confirmed with hash: `,tx.hash);


    const userAddress = "0x544e45b5d41bd64b77cf6662a20e0b1940b59638"
    //   const starttokenId=12
    let k = 0;
    var starttokenId;
    starttokenId = prompt("Enter Start Token id :")


    //this will transfer our 5 tokens from Goerli to mumbai
    while (k < 5) {
        try {
            let tokenID = starttokenId + k;
            let tx = await FXcontract.deposit(contractAddress, userAddress, tokenID, "0x6566");
            tx = tx.hash
            k++;
            console.log(`Transaction Deatials For token ${tokenID} are ${tx}`);
        } catch (e) {
            console.log(e);
        }
    }




}

// Call the batchMint function
batchMint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

