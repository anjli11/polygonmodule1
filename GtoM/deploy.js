
const hre = require("hardhat");
async function main() {
  const Assessment = await hre.ethers.getContractFactory("MyNFT");
  const assessment = await Assessment.deploy();
  await assessment.deployed();
  console.log(`A contract on Goerli tesnet deployed with this Address: ${assessment.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});