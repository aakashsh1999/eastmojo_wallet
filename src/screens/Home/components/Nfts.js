import React, { useEffect, useState } from "react";
import axios from "axios";
import FileSaver from "file-saver";
import { MdDownload } from "react-icons/md";
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
        <div className="relative bg-dark-600 p-2 rounded-md overflow-hidden h-[150px]">
          <button
            className="absolute bg-dark-600 h-5 w-5 rounded-full bottom-3 right-3 flex justify-center items-center text-white"
            onClick={() =>
              FileSaver.saveAs(
                tokenData.image?.startsWith("http")
                  ? tokenData.image
                  : `https://ipfs.io/ipfs/${tokenData?.image?.substr(
                      5,
                      tokenData?.image?.length
                    )}`,
                "image.png"
              )
            }
          >
            <MdDownload />
          </button>
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
