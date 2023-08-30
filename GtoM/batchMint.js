const { ethers } = require("hardhat");
const contractAB = require("../artifacts/contracts/MyToken.sol/MyNFT.json");

require("dotenv").config();

const contractAddress = process.env.GTOKEN_ADDRS;
async function batchMint() {
    // Connect to the deployed contract
    const contractABI = contractAB.abi;
    const contract = await ethers.getContractAt(contractABI, contractAddress);
    let k=process.env.IPFS
    for (let i = 1; i <= 5; i++) {
      const recipient = "0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce" //Nfts will be genrated for this account
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${k}/${i}.json`;
      console.log(`ipfsUrl ${i}:`, ipfsUrl)
  
      // Call the mint function of your ERC721 contract
      const tx = await contract.mint(recipient, ipfsUrl);
      console.log(`NFT with tokenID ${i} minted for recipient ${recipient} with hash`,tx.hash);
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
  
