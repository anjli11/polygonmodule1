const { ethers } = require("hardhat");
const contractAB = require("../artifacts/contracts/MyToken.sol/MyNFT.json");

async function getTokenIds(ownerAddress, contractAddress) {
    const contractABI = contractAB.abi;
  const contract = await ethers.getContractAt(contractABI, contractAddress);

  const balance = await contract.balanceOf(ownerAddress);
    console.log("balance",balance)
  const tokenIds = [];

  for (let i = 0; i < balance; i++) {
    const tokenId = await contract.getTokenIds();
    console.log("Token ID:", tokenId.toString());
  }

  return tokenIds;
}

const ownerAddress = "0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce";
const nftContractAddress = "0x2c5271e203b6DCfFF9728CbDcb2F235E236B02ec";

getTokenIds(ownerAddress, nftContractAddress)
  .then((tokenIds) => {
    console.log("Token IDs:", tokenIds);
  })
  .catch((error) => {
    console.error(error);
  });
