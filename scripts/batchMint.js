const { ethers } = require("hardhat");
const contractAB = require("../artifacts/contracts/MyToken.sol/MyNFT.json");
const { json } = require("express");

const contractAddress = "0x2c5271e203b6DCfFF9728CbDcb2F235E236B02ec";
async function batchMint() {
    // Connect to the deployed contract
    const contractABI = contractAB.abi;
    const contract = await ethers.getContractAt(contractABI, contractAddress);
  
    const ipfs = ["QmW9vFCA9Mbz4M9UQMGqJ6aerEsPvCTZrTxZkYyQGGXYYu", 
    "QmUAh13GQmz2guoz8tc6pQQJ5auK273bALPmjoBVUDTVHo",
    "QmVaraWez56BoudWYVqyejLp6tnVMRSGTBRXoNjQgh5uKr",
    "QmaB4enB7dNLdjPLQdttDtcLj8JGCstMXzucNB26WrTqxm",
    "QmUydN2xrgwYy7Jqpe1F3C3FVuGNXHYtyKtYunqbqjf4Mw"];
  

  
    // Mint each NFT
    for (let i = 0; i < ipfs.length; i++) {
      const recipient = "0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce"
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfs[i]}`;
      console.log("ipfsUrl= ", ipfsUrl)
  
      // Call the mint function of your ERC721 contract
      const tx = await contract.mint(recipient, ipfsUrl);
      console.log(`NFT minted for recipient ${recipient} with hash`,tx.hash);
      await tx.wait();
  
    }
  
    console.log("Batch minting completed");
  }
  
  // Call the batchMint function
  batchMint()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
