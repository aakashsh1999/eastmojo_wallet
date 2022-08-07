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

export const CRYPTOJSSECRET = "@^3Hl9H84Y4q";

export const NETWORKS = [
  {
    id: 1,
    rpc: "https://polygon-rpc.com/",
    text: "Polygon Mainnet",
  },
  {
    id: 2,
    rpc: "https://rpc-mumbai.maticvigil.com/",
    text: "Polygon Testnet",
  },
];
