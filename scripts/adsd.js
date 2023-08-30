//import c from "contracts/examples/erc721-transfer/FxERC721RootTunnel.sol"// Import necessary packages and contracts
const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
const ABI = require("../artifacts/contracts/MyToken.sol/MyNFT.json");
require("dotenv").config();
const aa=ABI.abi;
//Transfer ERC721A tokens to the Ethereum FxChain network
async function main() {
  // Set up connections to network and wallet
  const networkAddress =
    "https://eth-goerli.g.alchemy.com/v2/Bh22s-iYGmFwy-9Dq3New4jIpUES9xZt";
  const privateKey = "daacf807221af27adb38ecabd3fa2d2d38b73922a04287a316307cf9f9975909";
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get the signer instance
  const [signer] = await ethers.getSigners();

  // Get ERC721A contract instance
  const NFT = await ethers.getContractFactory("MyNFT");
  const nft = await NFT.attach("0x2c5271e203b6DCfFF9728CbDcb2F235E236B02ec");
console.log("nft:", nft);
  // Get FXRoot contract instance
  const fxRootAddress = "0x3c3df215DB925e274f6DafdcA801F300a0Df575F";
  const fxRoot = await ethers.getContractAt(FXRootContractAbi,fxRootAddress);
  console.log("fxRoot:", fxRoot);
  // TokenIds to transfer
  const tokenIds = [0, 1, 2, 3, 4];

  // Approve the nfts for transfer
  const approveTx = await nft
    .connect(signer)
    .setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Approval confirmed");
  console.log("depositing");
  const depositTx = await fxRoot
    .connect(signer)
    .deposit(nft.address, wallet.address,1, "0x6566");

  // Wait for the deposit to be confirmed
  await depositTx.wait();
  console.log("Deposit confirmed",depositTx);
  // Deposit the nfts to the FXRoot contracts
  
  for (let i = 0; i < tokenIds; i++) {
    console.log("depositing");
    const depositTx = await fxRoot
      .connect(signer)
      .deposit(nft.address, wallet.address, tokenIds[i], "0x6566");

    // Wait for the deposit to be confirmed
    await depositTx.wait();
    console.log("Deposit confirmed",depositTx);
  }

  console.log("Approved and deposited");

  // Test balanceOf
  const balance = await nft.balanceOf(wallet.address);

  // Print the balance of the wallet
  console.log(
    "NFT wallet balance",
    wallet.address,
    "is: ",
    balance.toString()
  );
}

// Call the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });