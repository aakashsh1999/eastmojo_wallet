import { useEffect, useState } from "react";
import { sha256 } from "js-sha256";
import { useSelector, useDispatch } from "react-redux";

function WSConnector() {
  const { currentNetwork, account } = useSelector((state) => state.wallet);
  const [walletSocket, setWalletSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [requestFrom, setRequestFrom] = useState("");
  const [loginRequested, setLoginRequested] = useState(false);

  useEffect(() => {
    connect();
  }, []);

  const getFingerPrint = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    let { ip } = await response.json();
    let deviceProp = navigator.userAgent.toString();
    let fingerPrint = ip + "_" + deviceProp;
    let sha = sha256(fingerPrint);
    return sha;
  };

  const connect = async () => {
    // const fingerPrint = await getFingerPrint();
    const fingerPrint = "navrajDevice";

    const chatSocket = new WebSocket(
      "ws://api.eastmojoconnect.com/socket/ws/" + fingerPrint + "/"
    );

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.message === "login_request") {
        setLoginRequested(true);
        setRequestFrom(data.from);
      }
    };

    chatSocket.onclose = function (e) {
      setIsConnected(false);
      console.error("Chat socket closed unexpectedly");
    };
    chatSocket.onopen = function (e) {
      setWalletSocket(chatSocket);
      setIsConnected(true);
    };
  };

  const acceptLogin = () => {
    walletSocket.send(
      JSON.stringify({
        message: "login_accepted",
        from: "BitWallet",
        address: account?.address,
      })
    );
    setLoginRequested(false);
  };

  const rejectLogin = () => {
    walletSocket.send(
      JSON.stringify({
        message: "login_rejected",
        from: "BitWallet",
      })
    );
    setLoginRequested(false);
  };

  const connector = {
    isConnected,
    loginRequested,
    requestFrom,
    setLoginRequested,
    acceptLogin,
    rejectLogin,
  };
  return connector;
}

export default WSConnector;
