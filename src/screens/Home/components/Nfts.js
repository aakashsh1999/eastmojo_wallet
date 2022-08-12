import React, { useEffect, useState } from "react";
import axios from "axios";
const Nfts = ({ token }) => {
  const [tokenData, setTokenData] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(token.tokenUri.gateway);
        setTokenData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <div className="bg-dark-600 p-2 rounded-md overflow-hidden">
      <img
        src={`https://ipfs.io/ipfs/${tokenData?.image?.substr(
          5,
          tokenData?.image?.length
        )}`}
        alt=""
      />
    </div>
  );
};

export default Nfts;
