import toast from "react-hot-toast";

export const PROVIDER = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export const copyToClipBoard = async (copyMe) => {
  if (!copyMe) {
    return;
  }
  try {
    await navigator.clipboard.writeText(copyMe);
    toast.success("Copied to Clipboard !");
  } catch (err) {
    toast.error("copy failed");
  }
};

export const BASECOVALENT = "https://api.covalenthq.com/v1";

export const CRYPTOJSSECRET = "@^3Hl9H84Y4q";
export const APIKEYCOVLANT = "ckey_ec86ef21635d4aa180f4225a894";
export const ALCHEMYKEY = "MBqUYiDLok2MLceJhXtRMyYSMC79M6hj";

export const NETWORKS = [
  {
    id: 1,
    rpc: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMYKEY}`,
    text: "Polygon Mainnet",
    chain: 137,
    explorer: "https://polygonscan.com",
  },
  {
    id: 2,
    rpc: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMYKEY}`,
    text: "Polygon Testnet",
    chain: 80001,
    explorer: "https://mumbai.polygonscan.com",
  },
];
