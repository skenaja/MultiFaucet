// Export faucet addresses
export const ADDRESSES = [
  {
    network: "palm_testnet",
    depleted: false,
    disclaimer: "Faucet drips 0.0001 PALM, 0.001 wETH, 1 DAI and 1 ERC-721 NFT.",
    etherscanPrefix: "explorer.palm-uat.xyz",
    formattedName: "Palm Testnet",
    connectionDetails: "https://docs.palm.io/Get-Started/Connect/Testnet/",
    autoconnect: {
      chainId: "0x2a15c3083",
      chainName: "Palm Testnet",
      nativeCurrency: {
        name: "Palm",
        symbol: "PALM",
        decimals: 18,
      },
      rpcUrls: ["https://palm-testnet.public.blastapi.io"],
      blockExplorerUrls: ["https://explorer.palm-uat.xyz//"],
    },
    addresses: {
      NFTs: "0xBA86F78747788ab119Adb899bBb552Ae93E5E1fA",
      wETH: "0xd067EcD0884481D212aC4559885A6c5Dc9be10da",
      DAI: "0x8d3E54F532b7EeEA3610861b35c1C6AD1F436c02",
    },
  },
  // {
  //   network: "rinkeby",
  //   disclaimer: "Faucet drips 0.5 ETH, 0.5 wETH, 50 DAI, and 5 NFTs (ERC721).",
  //   etherscanPrefix: "rinkeby.etherscan.io",
  //   formattedName: "Rinkeby",
  //   addresses: {
  //     NFTs: "0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b",
  //     wETH: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  //     DAI: "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D",
  //   },
  // },
  // {
  //   network: "goerli",
  //   disclaimer: "Faucet drips 1 ETH, 1 wETH, and 5 NFTs (ERC721).",
  //   etherscanPrefix: "goerli.etherscan.io",
  //   formattedName: "Görli",
  //   addresses: {
  //     NFTs: "0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b",
  //     wETH: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
  //   },
  // },
];

/**
 * Export details about networks
 */
export function getAddressDetails() {
  // Get active networks
  const activeNetworks: string[] = ADDRESSES.filter(
    // Filter for non-depleted
    ({ depleted }) => !depleted
    // Collect just formatted name
  ).map(({ formattedName }) => formattedName);
  // Get number of active networks
  const networkCount: number = activeNetworks.length;

  // Sort addresses (depleted last)
  const sortedAddresses = ADDRESSES.sort((a, b) => {
    const first = a.depleted ?? false;
    const second = b.depleted ?? false;
    return Number(first) - Number(second);
  });

  // Return details
  return { networkCount, sortedAddresses };
}
