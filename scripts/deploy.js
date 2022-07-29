async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT")
    console.log(MyNFT)
    const gasPrice = await MyNFT.signer.getGasPrice()
    console.log(`Current gas price: ${gasPrice}`)
    const estimatedGas = await MyNFT.signer.estimateGas(
        MyNFT.getDeployTransaction()
    )
    console.log(`Estimated gas: ${estimatedGas}`)

    const deploymentPrice = gasPrice.mul(estimatedGas)
    const deployerBalance = await MyNFT.signer.getBalance()
    console.log(`Deployer Balance: ${ethers.utils.formatEther(deployerBalance)}`)
    console.log(`Deployment price: ${ethers.utils.formatEther(deploymentPrice)}`)
    if (deployerBalance.lt(deploymentPrice)) {
        throw new Error(
            `Insufficient funds. Top up your account by balance by ${ethers.utils.formatEther(
                deploymentPrice.sub(deployerBalance)
            )}`
        )
    }

    // Start deployment and returning the promise that resolves to a contract object
    const myNFT = await MyNFT.deploy()
    await myNFT.deployed()
    console.log("Contract deployed to address: ", myNFT.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
