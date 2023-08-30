const { ethers } = require("hardhat");
const contractAB = require("../artifacts/contracts/MyToken.sol/MyNFT.json");


const contractAddress = "0x579012Ad7649061C66ae9dd291865e06E4F04d81";
async function TempMint() {
    // Connect to the deployed contract
    const contractABI = contractAB.abi;
    const contract = await ethers.getContractAt(contractABI, contractAddress);
    console.log("https://gateway.pinata.cloud/ipfs/Qmangv7972vKfRCNBgULALJCAUWe8skXDgP1qUD6jQhPq8")

    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/Qmangv7972vKfRCNBgULALJCAUWe8skXDgP1qUD6jQhPq8`;
    
    const recipient = "0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce"
      const tx = await contract.promptDescription(1);
      console.log(`NFT minted for recipient ${recipient} with hash`,tx.hash);
    //   await tx.wait();
    // // Mint each NFT
    // for (let i = 0; i < 5; i++) {
    //   console.log("ipfsUrl= ", ipfsUrl)
  
    //   // Call the mint function of your ERC721 contract
  
    // }
  
    console.log("Temp minting completed");
  }
  
  // Call the TempMint function
  TempMint()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
