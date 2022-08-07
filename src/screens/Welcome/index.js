import React, { useEffect, useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [steps, setSteps] = useState(0);
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const account = localStorage.getItem("bit-wallet");
    if (account) {
      navigate("/home");
      return;
    }
  }, []);
  const nextStep = () => {
    setSteps((prev) => prev + 1);
  };
  const prevStep = () => {
    setSteps((prev) => prev - 1);
  };

  return (
    <div className="max-w-[500px] w-full mx-auto py-10">
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
