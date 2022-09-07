/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require('hardhat-deploy');
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
module.exports = {
    solidity: "0.8.12",
    settings: {
        optimizer: {
            enabled: true,
            runs: 1,
        },
    },
    mocha: {
        timeout: 90000
    },
    networks: {
        palm_testnet: {
            url: `https://palm-testnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            accounts: [`0x` + process.env.PRIVATE_KEY],
            gasPrice: 1000
        },
        palm_mainnet: {
            url: `https://palm-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            accounts: [`0x` + process.env.PRIVATE_KEY],
            gasPrice: 1000
        },
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            accounts: [`0x` + process.env.PRIVATE_KEY],
            gasPrice: "auto"
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            accounts: [`0x` + process.env.PRIVATE_KEY],
            gasPrice: "auto"
        }
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: process.env.ETHERSCAN_API_KEY      }
};