import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";
import polygon from "../../assets/polygon.svg";
import Header from "../../components/Header";
import { MdSend, MdOutlineCallReceived, MdSwapHoriz } from "react-icons/md";
import Assets from "./components/Assets";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBalance, shortAddress } from "../../web3";
import { copyToClipBoard } from "../../utils";
import { useIndexedDB } from "react-indexed-db";
import { STORENAME } from "../../utils/dbConfig";
import { AES } from "crypto-js";
import { CRYPTOJSSECRET } from "../../utils";
import CryptoJS from "crypto-js";
const Home = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const { getByID } = useIndexedDB(STORENAME);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getAccount = async () => {
      try {
        const wallet = await getByID(1);
        if (!wallet) {
          navigate("/");
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
        const balance = await getUserBalance(account.address);
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

  return (
    <div className="relative max-w-[500px] mx-auto py-10">
      <Header account={account} />
      <div className="rounded-lg flex bg-dark-600 p-3 justify-between items-center mt-8">
        <p>Account 1</p>
        <div className="grid grid-flow-col justify-center items-center gap-2">
          <p>{shortAddress(account?.address)}</p>
          <button onClick={() => copyToClipBoard(account?.address)}>
            <FiCopy className="text-xl text-primary" />
          </button>
        </div>
      </div>
      <div className="bg-dark-600 p-3 mt-4 rounded-xl grid grid-flow-col justify-center gap-5 items-center py-6">
        <img src={polygon} className="w-10" alt="" />
        <p className="text-3xl">{balance} MATIC</p>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full mt-6">
        {data.map((val, i) => (
          <React.Fragment key={i}>
            <Button data={val} />
          </React.Fragment>
        ))}
      </div>
      <Assets />
    </div>
  );
};

export default Home;

const Button = ({ data }) => {
  return (
    <button className="bg-primary grid grid-flow-col gap-2 justify-center items-center py-2 px-2 rounded-md">
      <p>{data.text}</p>
      <span className="text-xl">{data.icon}</span>
    </button>
  );
};
