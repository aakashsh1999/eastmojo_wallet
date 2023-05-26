import { Button } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

const LoginRequest = ({ connector }) => {
  return (
    <div className=" bg-dark min-h-screen text-white">
      <div className="relative container py-10 ">
        <div className="rounded-lg flex bg-dark-600 p-3 justify-center items-center mt-8">
          Connection Request From
        </div>
        <div className="rounded-lg flex bg-dark-600 p-3 justify-center items-center mt-8">
          <p style={{ fontSize: 30 }}>{connector.requestFrom}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginTop: "50px",
          }}
        >
          <Button
            variant="filled"
            size="large"
            sx={{ fontSize: 20, background: "green", margin: "10px" }}
            onClick={() => {connector.acceptLogin(); window.location.href="https://api.eastmojoconnect.com"}}
            endIcon={<LockOpenIcon />}
          >
            Connect
          </Button>

          <Button
            variant="filled"
            size="large"
            sx={{ fontSize: 20, background: "red", margin: "10px" }}
            onClick={connector.rejectLogin}
            endIcon={<LockIcon />}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequest;
