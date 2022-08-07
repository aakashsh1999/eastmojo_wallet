import React, { useState } from "react";
// import dummy1 from "../../../assets/nfts/dummy1.png";
// import dummy2 from "../../../assets/nfts/dummy2.png";
const Assets = () => {
  const [currentActive, setCurrentActive] = useState(0);

  const tabs = ["NFT's", "ASSETS"];
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
      {/* <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <img src={dummy1} alt="" className="w-full" />
        </div>
        <div>
          <img src={dummy2} alt="" className="w-full" />
        </div>
      </div> */}
    </div>
  );
};

export default Assets;
