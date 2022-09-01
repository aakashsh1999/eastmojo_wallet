import React, { useEffect, useState } from "react";
import axios from "axios";
const Nfts = ({ token }) => {
  const [tokenData, setTokenData] = useState({});
  const [error, setError] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(token.tokenUri.gateway);
        setTokenData(data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    getData();
  }, [token?.tokenUri?.gateway]);

  return (
    <>
      {error ? (
        <div className="bg-dark-600 p-2 rounded-md overflow-hidden h-[150px] flex justify-center items-center text-red-400">
          Fetch Error
        </div>
      ) : (
        <div className="bg-dark-600 p-2 rounded-md overflow-hidden h-[150px]">
          <img
            className="h-full w-full"
            src={
              tokenData.image?.startsWith("http")
                ? tokenData.image
                : `https://ipfs.io/ipfs/${tokenData?.image?.substr(
                    5,
                    tokenData?.image?.length
                  )}`
            }
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Nfts;
