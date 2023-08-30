const { ethers } = require("hardhat");
var prompt = require('prompt-sync')();
const contractAB = require("../artifacts/contracts/MyToken.sol/MyNFT.json");

const cont = require("./abiFX.json")
const contractAddress = "0x579012Ad7649061C66ae9dd291865e06E4F04d81";
async function TempTransfer() {
    // Connect to the deployed FXcontract
    const contractABI = contractAB.abi;
    const contractBBI = cont;
    const fxContract="0xF9bc4a80464E48369303196645e876c8C7D972de";
    const contract = await ethers.getContractAt(contractABI, contractAddress);
    const FXcontract = await ethers.getContractAt(contractBBI, fxContract);

    //This will get approval for FxCOntract to transfer NFTS
    // let tx = await contract.setApprovalForAll(fxContract,true);
    //  console.log(`Approval Confirmed with hash: `,tx.hash);


    const userAddress = "0x544e45b5D41Bd64B77CF6662A20e0B1940B59638"
    //   const starttokenId=12
    let k = 10;
    var starttokenId;
    // starttokenId = prompt("Enter Start Token id :")

   let tx = await FXcontract.deposit(contractAddress, userAddress, 3, "0x6566");
    tx = tx.hash

    console.log(`Transaction Deatials For token are ${tx}`);
    //this will transfer our 5 tokens from Goerli to mumbai
    while (k < 5) {
        try {
            let tokenID = starttokenId + k;
            k++;
        } catch (e) {
            console.log(e);
        }
    }




}

// Call the TempTransfer function
TempTransfer()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

