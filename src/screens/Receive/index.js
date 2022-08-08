import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";
import polygon from "../../assets/polygon.svg";
import Header from "../../components/Header";
import { MdSend, MdOutlineCallReceived, MdSwapHoriz } from "react-icons/md";
// import Assets from "./components/Assets";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBalance, shortAddress } from "../../web3";
import { copyToClipBoard } from "../../utils";
import { useIndexedDB } from "react-indexed-db";
import { STORENAME } from "../../utils/dbConfig";
import { AES } from "crypto-js";
import { CRYPTOJSSECRET } from "../../utils";
import CryptoJS from "crypto-js";
import QRCode from "react-qr-code";
const Receive = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const { getByID } = useIndexedDB(STORENAME);

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

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         let balance = await getUserBalance(account.address);
  //         balance = Number(balance).toFixed(5);
  //         setBalance(balance);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const intervalId = setInterval(() => {
  //       if (account?.address) {
  //         getData();
  //       }
  //     }, 2000);
  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, [account]);

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
      <div className="bg-dark-400 rounded-lg p-3 max-w-max mx-auto mt-10">
        <QRCode
          value={account?.address ? account.address : "dummy"}
          size={250}
        />
      </div>
      <p className="text-center mt-5 text-xl">Please scan this to send Matic</p>
    </div>
  );
};

export default Receive;
