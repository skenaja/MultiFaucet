async function main() {
    const MultiFaucetGoerli = await ethers.getContractFactory("MultiFaucetGoerli");

    // Start deployment, returning a promise that resolves to a contract object
    // deploy with following params:  DAI addr, WETH addr, tokenURI
    const contract = await MultiFaucetGoerli.deploy("0x4CD23DB013fa3A692c2d59E2baea7887Fcf59EC0", "ipfs://QmVGaQWd2JuSz9vTqK2GskJryhZMoXdGvNgmhiDCHw3wP5");
    console.log("Contract deployed to address:", contract.address);
    }

    main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });