import React, { useEffect, useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import { useNavigate } from "react-router-dom";
// import { CRYPTOJSSECRET } from "../../utils";
// import { AES } from "crypto-js";
import { useIndexedDB } from "react-indexed-db";
import { STORENAME } from "../../utils/dbConfig";
// import CryptoJS from "crypto-js";
const Welcome = () => {
  const [steps, setSteps] = useState(0);
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();
  const { getByID } = useIndexedDB(STORENAME);

  useEffect(() => {
    const getAccount = async () => {
      try {
        const wallet = await getByID(1);
        if (wallet) {
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  const nextStep = () => {
    setSteps((prev) => prev + 1);
  };
  const prevStep = () => {
    setSteps((prev) => prev - 1);
  };

  return (
    <div className="max-w-[500px] w-full mx-auto py-10 px-4">
      {steps === 0 ? (
        <Step1 nextStep={nextStep} />
      ) : steps === 1 ? (
        <Step2 nextStep={nextStep} />
      ) : steps === 2 ? (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          setWallet={setWallet}
          wallet={wallet}
        />
      ) : (
        <Step4 nextStep={nextStep} prevStep={prevStep} wallet={wallet} />
      )}
    </div>
  );
};

export default Welcome;