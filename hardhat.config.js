require("@nomiclabs/hardhat-ethers")


const API_URL = "https://eth-goerli.g.alchemy.com/v2/axU10FCPHeb1VqQKkz5Agy90PRpMP6GX"
const PRIVATE_KEY = "da11b48a14732088eef08fb32a141896867c9b4418dd6edf48beae428df6741f"
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
