import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";
import polygon from "../../assets/polygon.svg";
import Header from "../../components/Header";
import { MdSend, MdOutlineCallReceived, MdSwapHoriz } from "react-icons/md";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkAddress,
  getUserBalance,
  sendCurrency,
  shortAddress,
} from "../../web3";
import { copyToClipBoard } from "../../utils";
import { useIndexedDB } from "react-indexed-db";
import { STORENAME } from "../../utils/dbConfig";
import { AES } from "crypto-js";
import { CRYPTOJSSECRET } from "../../utils";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import toast from "react-hot-toast";
const Send = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const { getByID } = useIndexedDB(STORENAME);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);

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

  const data = [
    {
      text: "Send",
      icon: <MdSend />,
    },
    {
      text: "Receive",
      icon: <MdOutlineCallReceived />,
    },
    {
      text: "Swap",
      icon: <MdSwapHoriz />,
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        let balance = await getUserBalance(account.address);
        balance = Number(balance).toFixed(5);
        // console.log("balance", balance);
        setBalance(balance);
      } catch (error) {
        console.log(error);
      }
    };

    const intervalId = setInterval(() => {
      if (account?.address) {
        getData();
      }
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [account]);
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
        <div className="mt-28 grid gap-4">
          <div className="">
            <label htmlFor="">Enter Address</label>
            <input
              type="text"
              className="bg-transparent w-full mt-2 rounded-xl border-2  py-3 focus:border-primary border-primary "
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">
              <div className="flex items-center justify-between">
                <p>Enter Amount</p>
                <p>Balance: {balance}</p>
              </div>
            </label>
            <input
              type="number"
              className="bg-transparent w-full mt-2 rounded-xl border-2  py-3 focus:border-primary border-primary "
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            onClick={sendMatic}
            className={` ${
              loading ? "bg-gray-500 pointer-events-none" : "bg-primary"
            } py-3 px-10 mt-10  rounded-xl flex justify-center `}
          >
            {loading ? "Please wait..." : " Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Send;

const Button = ({ data }) => {
  return (
    <button className="bg-primary grid grid-flow-col gap-2 justify-center items-center py-2 px-2 rounded-md">
      <p>{data.text}</p>
      <span className="text-xl">{data.icon}</span>
    </button>
  );
};
