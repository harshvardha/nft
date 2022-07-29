const API_URL = "https://eth-goerli.g.alchemy.com/v2/axU10FCPHeb1VqQKkz5Agy90PRpMP6GX"
const PUBLIC_KEY = "0x31Dc7671D4338BA060f1D95Fca7585e2dC821bEe"
const PRIVATE_KEY = "da11b48a14732088eef08fb32a141896867c9b4418dd6edf48beae428df6741f"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0xb798B832A6d5Dd1cD605486C0c5Ca8eb7E3087E6"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

//create transaction
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest")

    // the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    }
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (error, hash) {
                if (!error) {
                    console.log(`The hash of your transaction is: ${hash}\nCheck Alchemy's Mempool to view the status of your transaction`)
                }
                else {
                    console.log(`Something went wrong when submitting your transaction: ${error}`)
                }
            }
        ).on('receipt', (receipt) => {
            console.log(receipt)
        })
    })
        .catch((error) => {
            console.log(`Promise failed: ${error}`)
        })
}

mintNFT("https://gateway.pinita.cloud/ipfs/QmdyLBgj5m9eQ6mptKQE3W3aFB4PQi1euBLphQJqRj8qot")