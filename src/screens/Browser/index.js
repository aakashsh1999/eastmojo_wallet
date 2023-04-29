import { useEffect } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const Browser = () => {
  useEffect(() => {
    window.ethereum = "Navraj";
  }, []);
  return (
    <div className="relative container py-10">
      <Link to="/home" className="flex items-center ">
        <AiFillCaretLeft className="text-3xl text-primary" />
        <p className="ml-1 text-lg text font-bold"> Back</p>
      </Link>
      <button onClick={() => console.log(window)}>Window</button>
      <div className="mt-10 text-white text-sm">
        <iframe
          src="https://www.bing.com/"
          title="Browser"
          width="100%"
          height="500px"
        ></iframe>
      </div>
    </div>
  );
};

export default Browser;
