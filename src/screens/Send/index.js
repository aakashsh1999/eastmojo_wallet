import React, { useState } from "react";
// import { FiCopy } from "react-icons/fi";
import polygon from "../../assets/polygon.svg";
import Header from "../../components/Header";
import { MdSend } from "react-icons/md";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendCurrency } from "../../web3";

import { useIndexedDB } from "react-indexed-db";
import { STORENAME } from "../../utils/dbConfig";
import { AES } from "crypto-js";
import { APIKEYCOVLANT, BASECOVALENT, CRYPTOJSSECRET } from "../../utils";
import CryptoJS from "crypto-js";
import axios from "axios";
import TransactionBlock from "./components/TransactionBlock";

const Send = () => {
  const [account, setAccount] = useState({});
  const navigate = useNavigate();
  const { getByID } = useIndexedDB(STORENAME);
  // eslint-disable-next-line no-unused-vars
  // const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentNetwork, setCurrentNetwork] = useState({});

  useEffect(() => {
    const getAccount = async () => {
      try {
        const wallet = await getByID(1);
        if (!wallet || !wallet.wallet) {
          navigate("/");
          return;
        }
        if (wallet && wallet.wallet && wallet.active === false) {
          navigate("/login");
          return;
        }

        const bytes = AES.decrypt(wallet.wallet, CRYPTOJSSECRET);
        const originalWallet = bytes.toString(CryptoJS.enc.Utf8);
        setAccount(JSON.parse(originalWallet));
      } catch (error) {
        console.log(error);
      }
    };

    getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  useEffect(() => {
    const id = setInterval(() => {
      const currentLocalNetwork = window.localStorage.getItem(
        "bit-current-network"
      );
      if (currentLocalNetwork) {
        setCurrentNetwork(JSON.parse(currentLocalNetwork));
      }
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { data },
      } = await axios.get(
        `${BASECOVALENT}/${currentNetwork.chain}/address/${account?.address}/transactions_v2/?key=${APIKEYCOVLANT}`
      );
      // console.log(data);
      setTransactions(data.items);
    };
    if (account?.address && currentNetwork?.chain) {
      getData();
    }
  }, [account, currentNetwork]);

  const sendMatic = async () => {
    try {
      setLoading(true);
      const { tx } = await sendCurrency(toAddress, amount, account);
      console.log(tx);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="relative container py-10 ">
      <Header account={account} />
      {/* <div className="rounded-lg flex bg-dark-600 p-3 justify-between items-center mt-8">
        <p>Account 1</p>
        <div className="grid grid-flow-col justify-center items-center gap-2">
          <p>{shortAddress(account?.address)}</p>
          <button onClick={() => copyToClipBoard(account?.address)}>
            <FiCopy className="text-xl text-primary" />
          </button>
        </div>
      </div> */}
      <div>
        <div className="mt-5 grid gap-4">
          <div className="relative mt-10">
            <div className="absolute top-1/2 gap-2 -translate-y-1/2 left-4 grid grid-flow-col justify-start  items-center">
              <img src={polygon} className="w-6" alt="" />
              <p className="text-xl">Matic</p>
            </div>
            <input
              type="number"
              className="bg-[#1F1F20] w-full  rounded-xl py-3 px-4 border-none focus:border-none focus:ring-0 text-right text-xl  font-bold min-h-[60px] pl-36"
              value={amount}
              placeholder="100"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="">
            {/* <label htmlFor="">Enter Address</label> */}
            <input
              type="text"
              className="bg-[#1F1F20] w-full mt-2 rounded-xl  py-3 px-4 border-none focus:border-none focus:ring-0   font-medium min-h-[60px]"
              value={toAddress}
              placeholder="Enter receiver wallet address here..."
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>
          <button
            onClick={sendMatic}
            className={` ${
              loading ? "bg-gray-500 pointer-events-none" : "bg-primary"
            } py-3 px-10 mt-4  rounded-xl flex justify-center  items-center max-w-max`}
          >
            <p>{loading ? "Please wait..." : " Send"}</p>
            <p className="ml-2 ">
              <MdSend />
            </p>
          </button>
          <p className="font-bold text-xl mt-6 text-[#666262]">
            Recent transactions
          </p>
          <TransactionBlock
            transactions={transactions}
            account={account}
            currentNetwork={currentNetwork}
          />
        </div>
      </div>
    </div>
  );
};

export default Send;
