import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FileSaver from "file-saver";
import { MdDownload } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  width: "100%",
  bgcolor: "transparent",
  boxShadow: 24,
  p: 4,
};

export default function NftDetailsModal({ open, setOpen, tokenData }) {
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("heelo");
    console.log(tokenData);
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
      >
        <Box sx={style}>
          <div className="bg-[#262626] p-4 rounded-md relative">
            <button
              className="absolute right-6 top-6 text-2xl text-white"
              onClick={handleClose}
            >
              <FaTimes />
            </button>
            <button
              className="absolute bg-dark-600 h-6 w-6 rounded-full bottom-3 right-3 flex justify-center items-center text-white text-2xl"
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
            <div className="max-h-[300px] overflow-hidden">
              <img
                className="w-full"
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
            <div className="text-white mt-2 py-4">
              <p>
                {" "}
                <b>Name :</b> {tokenData?.name ? tokenData.name : "Not defined"}{" "}
              </p>
              <p>
                <b>Discription : </b>
                {tokenData?.description ? tokenData.description : "Not defined"}
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
