import Web3 from "web3";
import { PROVIDER } from "../utils";
import { stakeAbi, stakeAddress } from "./contracts/staking";
import { tokenAbi, tokenAddress } from "./contracts/token";
// import toast from "react-hot-toast";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { formatEther } from "ethers/lib/utils";

export const shortAddress = (str) => {
  if (str) {
    if (str.length < 10) return str;
    return `${str.slice(0, 4)}...${str.slice(-7)}`;
  } else {
    return "";
  }
};

export const formatFromWei = (str, decimal) => {
  if (str) {
    if (str.length < 1) return str;
    if (+decimal === 9) {
      return Web3.utils.fromWei(str, "Gwei");
    } else {
      return Web3.utils.fromWei(str, "ether");
    }
  }
};
export const checkAddress = (addr) => {
  try {
    const address = ethers.utils.getAddress(addr);
    if (address) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserBalance = async (account) => {
  try {
    // const web3 = await getWeb3();
    const localProvider = JSON.parse(
      localStorage.getItem("bit-current-network")
    );
    // console.log(localProvider);
    if (!localProvider) {
      return 0;
    }
    const provider = new ethers.providers.JsonRpcProvider(localProvider.rpc);
    let balance = await provider.getBalance(account);

    return ethers.utils.formatEther(balance);
  } catch (err) {
    console.log("error", err);
    return 0;
  }
};

export const getWeb3 = async () => {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER));
    console.log(web3);
    return web3;
  } catch (err) {
    console.log("error", err);
  }
};

export const getDecimal = async () => {
  // eslint-disable-next-line no-unused-vars
  const { ok, contract: tokenContract } = await getContract(tokenAddress);
  let decimal = await tokenContract.methods.decimals().call();
  return decimal;
};

export const createAccount = async () => {
  const web3 = await getWeb3();

  const account = web3.eth.accounts.create();
  return account;
};
export const createAccount2 = async () => {
  try {
    const account = await ethers.Wallet.createRandom();
    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getProvider = async () => {
  try {
    const localProvider = JSON.parse(
      localStorage.getItem("bit-current-network")
    );
    // console.log(localProvider);
    if (!localProvider) {
      return 0;
    }
    const provider = new ethers.providers.JsonRpcProvider(localProvider.rpc);
    return provider;
  } catch (error) {
    return null;
  }
};

export const getContract = async (token) => {
  try {
    const web3 = await getWeb3();

    let contract = null;
    if (token) {
      contract = new web3.eth.Contract(tokenAbi, token);
    } else {
      contract = new web3.eth.Contract(stakeAbi, stakeAddress);
    }
    return { contract: contract, ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, contract: null };
  }
};
export const getCustomContract = async (abi, address) => {
  try {
    const web3 = await getWeb3();
    let contract = null;
    contract = new web3.eth.Contract(abi, address);
    return { contract: contract, ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, contract: null };
  }
};

export const sendCurrency = async (toAddress, amount, wallet) => {
  const isValid = checkAddress(toAddress);
  if (!isValid) {
    toast.error("Not a valid address, Please Input a valid address");
    return { tx: null, ok: false };
  }
  const provider = await getProvider();
  if (!provider) {
    toast.error("Something went wrong");
    return { tx: null, ok: false };
  }
  const bal = await provider.getBalance(wallet.address);
  const realBal = formatEther(bal.toString());

  if (+realBal < amount) {
    toast.error("Insufficient balance");
    return;
  }

  const toastId = toast.loading("Transaction processing..");

  let signer = new ethers.Wallet(wallet.privateKey, provider);

  // const nonce = await signer.getTransactionCount(wallet.address, "latest");
  // const gasPrice = await signer.getGasPrice();
  // // console.log(gasPrice);
  // const gasLimit = "100000";
  let txObject = {
    to: toAddress,
    value: ethers.utils.parseEther(amount),
    // gasPrice: gasPrice,
    // gasLimit: ethers.utils.hexlify(gasLimit),
    // nonce,
  };

  console.log(txObject);

  // return;
  try {
    const tx = await signer.sendTransaction(txObject);
    toast.loading("Please wait we are getting confirmation from blockchain", {
      id: toastId,
    });
    console.log(tx);
    const hash = await tx.wait();
    toast.success("Transaction completed successfully!", { id: toastId });
    return { tx: hash, ok: true };
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", { id: toastId });
    return { tx: null, ok: false };
  }
};
