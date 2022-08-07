import Web3 from "web3";
import { PROVIDER } from "../utils";
import { stakeAbi, stakeAddress } from "./contracts/staking";
import { tokenAbi, tokenAddress } from "./contracts/token";
import toast from "react-hot-toast";
import { ethers } from "ethers";

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
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
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

export const getAccount = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    if (user.walletAddress) {
      return { ok: true, account: user.walletAddress };
    }
    return { ok: false, account: null };
  } else {
    return { ok: false, account: null };
  }
};
