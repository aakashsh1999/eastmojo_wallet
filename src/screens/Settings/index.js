/* eslint-disable no-unused-vars */
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
import { FaCopy } from "react-icons/fa";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
const Settings = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const { getByID } = useIndexedDB(STORENAME);
  const [step, setStep] = useState(0);
  const [privateKey, setPrivateKey] = useState(null);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
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
      {step === 0 ? (
        <>
          <Step1 account={account} nextStep={nextStep} prevStep={prevStep} />
        </>
      ) : step === 1 ? (
        <>
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            setPrivateKey={setPrivateKey}
          />
        </>
      ) : (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          setPrivateKey={setPrivateKey}
          privateKey={privateKey}
        />
      )}
    </div>
  );
};

export default Settings;
