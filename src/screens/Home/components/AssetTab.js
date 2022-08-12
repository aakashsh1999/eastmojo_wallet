import React from "react";
import { formatFromWei } from "../../../web3";

const AssetTab = ({ balances, account, currentNetwork }) => {
  return (
    <div className="">
      {balances?.length > 0 ? (
        balances.slice(0, 5).map((asset, i) => {
          return (
            <div className="flex justify-between py-2">
              <div className="grid  grid-flow-col justify-start items-center gap-2">
                <div>
                  <p>{asset.contract_ticker_symbol}</p>
                </div>
              </div>
              <div>
                <p>
                  {formatFromWei(asset.balance)} {asset.contract_ticker_symbol}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center">
          <p>Not Found</p>
        </div>
      )}
    </div>
  );
};

export default AssetTab;
