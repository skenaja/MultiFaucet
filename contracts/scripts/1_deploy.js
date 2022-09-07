async function main() {
    const MultiFaucet = await ethers.getContractFactory("MultiFaucet");

    // Start deployment, returning a promise that resolves to a contract object
    const contract = await MultiFaucet.deploy("0x8d3E54F532b7EeEA3610861b35c1C6AD1F436c02", "0xd067EcD0884481D212aC4559885A6c5Dc9be10da","ipfs://QmVGaQWd2JuSz9vTqK2GskJryhZMoXdGvNgmhiDCHw3wP5");
    console.log("Contract deployed to address:", contract.address);
    }

    main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });