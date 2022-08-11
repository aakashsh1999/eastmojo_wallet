import axios from "axios";
import React, { useEffect, useState } from "react";
import { APIKEYCOVLANT, BASECOVALENT } from "../../../utils";
import ActivityTab from "./ActivityTab";
import AssetTab from "./AssetTab";
// import dummy1 from "../../../assets/nfts/dummy1.png";
// import dummy2 from "../../../assets/nfts/dummy2.png";
const Assets = ({ currentNetwork, account }) => {
  const [currentActive, setCurrentActive] = useState(0);
  const [transactions, setTransactions] = useState(null);
  const [balances, setBalances] = useState(null);

  const tabs = ["Assets", "Activity"];
  useEffect(() => {
    const getData = async () => {
      const {
        data: { data },
      } = await axios.get(
        `${BASECOVALENT}/${currentNetwork.chain}/address/${account?.address}/transactions_v2/?key=${APIKEYCOVLANT}`
      );
      // console.log(data);
      setTransactions(data.items);
    };
    if (account?.address) {
      getData();
    }
  }, [account, currentNetwork]);
  useEffect(() => {
    const getData = async () => {
      const {
        data: { data },
      } = await axios.get(
        `${BASECOVALENT}/${currentNetwork.chain}/address/${account?.address}/balances_v2/?key=${APIKEYCOVLANT}`
      );
      console.log(data);
      setBalances(data.items);
    };
    if (account?.address) {
      getData();
    }
  }, [account, currentNetwork]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-1 mt-10">
        {tabs.map((val, i) => (
          <button
            key={i}
            className={`p-2 block  border-b-2  ${
              i === currentActive ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setCurrentActive(i)}
          >
            <p className="text-xl text-center">{val}</p>
          </button>
        ))}
      </div>
      <div className="mt-10">
        {currentActive === 0 ? (
          <AssetTab
            balances={balances}
            account={account}
            currentNetwork={currentNetwork}
          />
        ) : (
          <ActivityTab
            transactions={transactions}
            account={account}
            currentNetwork={currentNetwork}
          />
        )}
      </div>
    </div>
  );
};

export default Assets;
