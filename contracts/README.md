# MultiFaucet

## About

MultiFaucet is a simple [faucet](https://en.wikipedia.org/wiki/History_of_bitcoin#Bitcoin_faucets) that drips `Ether/Matic`, `Wrapped Ether/Wrapped Matic`, `DAI Stablecoin`, and mints ERC721 NFTs to a recipient.

It enables a super operator to `drip` and `drain` to a recipient, add approved operators, or update the super operator. Approved operators can only `drip` to a recipient.

This is a forked hardhat version of [MultiFaucet](https://github.com/anish-agnihotri/MultiFaucet) specifically for Palm Testnet


## Build and Test

```bash
# download repo
git clone https://github.com/skenaja/MultiFaucet
cd MultiFaucet/contracts

# build contracts
yarn
npx hardhat compile

# deploy
npx hardhat run scripts/1_deploy.js 
```

## License

[GNU Affero GPL v3.0](https://github.com/Anish-Agnihotri/MultiFaucet/blob/master/LICENSE)

## Credits

- [@gakonst/lootloose](https://github.com/gakonst/lootloose) for DappTools info
- ds-test, OpenZeppelin for inherited libraries
- https://github.com/Anish-Agnihotri/MultiFaucet
