
require("dotenv").config();
const {use }= require('@maticnetwork/maticjs');
const { Web3ClientPlugin }  = require('@maticnetwork/maticjs-web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { POSClient } = require('@maticnetwork/maticjs');

const rootContract=process.env.GTOKEN_ADDRS
const childContract=process.env.MTOKEN_ADDRS
console.log(childContract);
const G_ADDRS=process.env.G_ADDRS
const M_ADDRS=process.env.M_ADDRS
use(Web3ClientPlugin);



async function CheckBalance() {

    const privateKey = process.env.PRIVATE_KEY;
    const parentProvider = new HDWalletProvider(process.env.PRIVATE_KEY, 'https://eth-goerli.g.alchemy.com/v2/822oQpZ5OrMUvLi2iGTTHHCuL0yABhe_');
    const maticProvider = new HDWalletProvider(process.env.PRIVATE_KEY, 'https://polygon-mumbai.g.alchemy.com/v2/bMQR3QJ0GWX5gZQZpIaY_GnoUCj1pm7M');
    const posClient = new POSClient();
    await posClient.init({
        network: 'testnet',
        version: 'mumbai',
        parent: {
          provider: parentProvider,
          defaultConfig: {
            from : G_ADDRS
          }
    
        },
        child: {
          provider: maticProvider,
          defaultConfig: {
            from : M_ADDRS
          }
        }
    });
    //Parent Provider and goerli token
    console.log("Checking balance...");
    const erc721ParentToken = posClient.erc721(rootContract,true);
    const balanceofG = await erc721ParentToken.getTokensCount(G_ADDRS)
    // console.log(`Balance of on Polygon Mumbai: }`);
    console.log('balance on Goerli ', balanceofG)
    
    
    // child provider and  mumbai token
    try{

      const erc721ChildToken = posClient.erc721(childContract);
      const balanceofM = await erc721ChildToken.getTokensCount(M_ADDRS)
      console.log('balance on Mumbai ', balanceofM)
    }catch(e){
      console.log(`Token Mapping is Pending it will Take around 15 to 20 minutes \nto Map The token from Goerli to Mumbai`)
    }

}

CheckBalance()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
