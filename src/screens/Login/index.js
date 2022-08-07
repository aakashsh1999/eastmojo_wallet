import React, { useState } from "react";
import Spinner from "react-svg-spinner";
import { useIndexedDB } from "react-indexed-db";
import { STORENAME } from "../../utils/dbConfig";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { getByID, update } = useIndexedDB(STORENAME);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    setLoading(true);
    try {
      const wallet = await getByID(1);
      console.log(wallet);
      if (!wallet.jsonwallet) {
        setLoading(false);
        toast.error("something went wrong");
        return;
      }
      try {
        const decrypted = ethers.Wallet.fromEncryptedJsonSync(
          wallet.jsonwallet,
          password
        );
        if (decrypted._isSigner) {
          const res = await update({ ...wallet, active: true });
          console.log(res);
          toast.success("Logged in successfully");
          setLoading(false);
          //   setTimeOut
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
        toast.error("Invalid password");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setLoading(false);
    }
  };
  return (
    <div className="container ">
      <div className="min-h-screen flex flex-col justify-center">
        <h2 className="max-w-[300px] text-muted  text-5xl font-extrabold  leading-[3.5rem] ">
          Login
        </h2>
        <div className="mt-10">
          <label htmlFor="" className="block text-muted-400">
            Password
          </label>
          <input
            type="password"
            className="bg-transparent w-full mt-2 rounded-xl border-2 border-[#232424] py-3 focus:border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className={` ${
            loading ? "bg-gray-500 pointer-events-none" : "bg-primary"
          } py-3 px-10 mt-10  rounded-xl flex justify-center `}
        >
          {loading ? "Please wait..." : " Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;