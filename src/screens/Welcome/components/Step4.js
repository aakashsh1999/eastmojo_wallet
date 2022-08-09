import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillCaretLeft } from "react-icons/ai";
import Spinner from "react-svg-spinner";
import { useNavigate } from "react-router-dom";
import { AES } from "crypto-js";
import { CRYPTOJSSECRET } from "../../../utils";
import { useIndexedDB } from "react-indexed-db";
import { STORENAME } from "../../../utils/dbConfig";
const Step4 = ({ nextStep, prevStep, wallet }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { add } = useIndexedDB(STORENAME);

  const handleSubmit = async () => {
    console.log(!password);
    if (!password) {
      toast.error("password is required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("password does not Match!");
      return;
    }
    if (!checked) {
      toast.error("Please agree to our terms & conditions");
      return;
    }

    if (!wallet) {
      toast.error("No wallet created");
      return;
    }
    try {
      setLoading(true);
      const encrypted = await wallet.encrypt(password);
      const memnoic = wallet._mnemonic();

      const encryptedWallet = AES.encrypt(
        JSON.stringify({
          address: wallet.address,
          privateKey: wallet.privateKey,
          memnoic,
        }),
        CRYPTOJSSECRET
      ).toString();

      add({
        wallet: encryptedWallet,
        jsonwallet: encrypted,
        active: true,
      }).then(
        (event) => {
          console.log(event);
        },
        (error) => {
          console.log(error);
        }
      );
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <button className="flex items-center" onClick={prevStep}>
        <AiFillCaretLeft className="text-3xl text-primary" />
        <p className="ml-1 text-lg text font-bold"> Back</p>
      </button>
      <h2 className="max-w-[300px] text mt-6 text-5xl font-extrabold  leading-[3.5rem]">
        Create password
      </h2>
      <div className="mt-10">
        <label htmlFor="" className="block text-400">
          Password
        </label>
        <input
          type="password"
          className="bg-transparent w-full mt-2 rounded-xl border-2 border-[#232424] py-3 focus:border-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-4 ">
        <label htmlFor="" className="block text-400">
          Confirm Password
        </label>
        <input
          type="password"
          className="bg-transparent w-full mt-2 rounded-xl border-2 border-[#232424] py-3 focus:border-primary"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mt-4 grid grid-flow-col gap-2 items-center justify-start">
        <input
          type="checkbox"
          name=""
          id="term"
          className="bg-transparent rounded p-2.5 focus:outline-none "
          value={checked}
          onChange={() => setChecked(!checked)}
        />
        <label htmlFor="term" className="block text-muted-400">
          I agree to the Terms and conditions of BIT wallet.
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className={` ${
          loading ? "bg-gray-500 pointer-events-none" : "bg-primary"
        } py-3 px-10 mt-10  rounded-xl`}
      >
        {loading ? <Spinner color={"white"} size="20px" /> : " Create"}
      </button>
    </div>
  );
};

export default Step4;
