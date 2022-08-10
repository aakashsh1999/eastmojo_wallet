import React from "react";
import { FiCopy } from "react-icons/fi";
import QRCode from "react-qr-code";
import { copyToClipBoard } from "../../../utils";
const Step1 = ({ account, nextStep, prevStep }) => {
  return (
    <>
      <div className="bg-dark-400 rounded-lg p-3 max-w-max mx-auto mt-10">
        <QRCode
          value={account?.address ? account.address : "dummy"}
          size={250}
        />
      </div>
      <div className="bg-dark-400 p-2 break-all break-words max-w-[250px] rounded-md w-full text-center mt-4 mx-auto grid grid-flow-col gap-2 items-center justify-between">
        <p className="text-sm">{account?.address}</p>
        <button onClick={() => copyToClipBoard(account?.address)}>
          <FiCopy className="text-xl text-primary" />
        </button>
      </div>
      <button
        onClick={nextStep}
        className="bg-primary py-2 px-8 rounded-full mx-auto block mt-10"
      >
        Export Private Key
      </button>
    </>
  );
};

export default Step1;
