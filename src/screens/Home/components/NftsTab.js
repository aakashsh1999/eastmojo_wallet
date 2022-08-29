import React, { useEffect, useState } from "react";
import { ALCHEMYKEY } from "../../../utils";
// import { formatFromWei } from "../../../web3";
import Nfts from "./Nfts";
const { Network, Alchemy } = require("alchemy-sdk");

const NftsTab = ({ balances, account, currentNetwork }) => {
  const [nfts, setNfts] = useState([]);
  const settings = {
    apiKey: ALCHEMYKEY, // Replace with your Alchemy API Key.
    network:
      currentNetwork.chain === 137
        ? Network.MATIC_MAINNET
        : Network.MATIC_MUMBAI, // Replace with your network.
  };
  //   console.log(Network);
  const alchemy = new Alchemy(settings);
  useEffect(() => {
    const getData = async () => {
      try {
        const nfts = await alchemy.nft.getNftsForOwner(account?.address);

        setNfts(nfts.ownedNfts);
      } catch (error) {
        console.log(error);
      }
    };
    if (account?.address) {
      getData();
    }
  }, [account?.address, account, alchemy.nft]);

  return (
    <div className="">
      {nfts?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
          {nfts.slice(0, 5).map((asset, i) => {
            return (
              <React.Fragment key={i}>
                <Nfts token={asset} />
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>Not Found</p>
        </div>
      )}
    </div>
  );
};

export default NftsTab;
