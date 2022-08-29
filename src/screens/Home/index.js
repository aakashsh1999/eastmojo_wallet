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
import Clipboard from "react-clipboard.js";
import toast from "react-hot-toast";
const Home = () => {
  const [account, setAccount] = useState({});
  const navigate = useNavigate();
  const { getByID } = useIndexedDB(STORENAME);
  const [balance, setBalance] = useState(0);
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
        // console.log(JSON.parse(originalWallet));
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
      handler: () => {
        navigate("/send");
      },
    },
    {
      text: "Receive",
      icon: <MdOutlineCallReceived />,
      handler: () => {
        navigate("/receive");
      },
    },
    // {
    //   text: "Swap",
    //   icon: <MdSwapHoriz />,
    //   handler: () => {
    //     navigate("/home");
    //   },
    // },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        let balance = await getUserBalance(account.address);
        balance = Number(balance).toFixed(5);
        setBalance(balance);
        // console.log(balance);
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

  useEffect(() => {
    const id = setInterval(() => {
      const currentLocalNetwork = window.localStorage.getItem(
        "bit-current-network"
      );
      if (currentLocalNetwork) {
        setCurrentNetwork(JSON.parse(currentLocalNetwork));
        // console.log(currentLocalNetwork);
      }
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="relative container py-10 ">
      <Header account={account} />
      <div className="rounded-lg flex bg-dark-600 p-3 justify-between items-center mt-8">
        <p>Account 1</p>
        <div className="grid grid-flow-col justify-center items-center gap-2">
          <p>{shortAddress(account?.address)}</p>
          <Clipboard
            data-clipboard-text={account?.address}
            onSuccess={() => toast.success("copied to clipboard")}
          >
            <button>
              <FiCopy className="text-xl text-primary" />
            </button>
          </Clipboard>
        </div>
      </div>
      <div className="bg-dark-600 p-3 mt-4 rounded-xl grid grid-flow-col justify-center gap-5 items-center py-6">
        <img src={polygon} className="w-10" alt="" />
        <p className="text-3xl">{balance} MATIC</p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full mt-6">
        {data.map((val, i) => (
          <React.Fragment key={i}>
            <Button data={val} onClick={val.handler} />
          </React.Fragment>
        ))}
      </div>
      <Assets currentNetwork={currentNetwork} account={account} />
    </div>
  );
};

export default Home;

const Button = ({ data, ...props }) => {
  return (
    <button
      {...props}
      className="bg-primary grid grid-flow-col gap-2 justify-center items-center py-2 px-2 rounded-md"
    >
      <p>{data.text}</p>
      <span className="text-xl">{data.icon}</span>
    </button>
  );
};
