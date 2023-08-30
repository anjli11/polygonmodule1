const { ethers } = require("hardhat");
const contractAB = require("../artifacts/contracts/MyToken.sol/MyNFT.json");

const contractAddress = "0x2c5271e203b6DCfFF9728CbDcb2F235E236B02ec";
async function batchMint() {
    // Connect to the deployed contract
    const contractABI = contractAB.abi;
    const contract = await ethers.getContractAt(contractABI, contractAddress);
  
  
      // Call the balance function of your ERC721 contract
      const tx = await contract.balanceOf("0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce");
      console.log(`Balance For ${tx}`);
      // await tx.wait();

  
    

  }
  
  // Call the batchMint function
  batchMint()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
