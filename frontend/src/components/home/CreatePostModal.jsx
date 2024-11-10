import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { Fa42Group } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";
import { RiGroupFill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import PrivacyBox from "./PrivacyBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function CreatePostModal() {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [emojiOpen, setEmojiOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  React.useEffect(() => {
    if (status.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [status]);
  return (
    <>
      <input
        onClick={handleOpen}
        className="border-0 outline-0 cursor-pointer ps-3 rounded-pill w-100 bg-light-gray"
        readOnly
        placeholder={`Whats on your mind, ${user?.f_name}?`}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ background: "rgba(255,255,255,0.5)" }}
      >
        <Box sx={style} className="rounded-3 shadow-lg">
          <Typography className="text-center" variant="h5">
            Create post
          </Typography>
          <hr />
          <div className="d-flex gap-2 align-items-center">
            <img
              src={user?.image ? user?.image : "/icons/user.png"}
              width={40}
              height={40}
              className="rounded-full"
              alt="user image"
            />
            <div className="cursor-pointer">
              <Typography className="text-md fw-semibold">
                {user?.f_name} {user?.l_name}
              </Typography>
              <div className="bg-gray w-max p-1 rounded-1">
                <div className="d-flex align-items-center gap-1 text-sm fw-semi-bold">
                  <RiGroupFill />
                  <Typography className="fw-semibold text-sm">
                    Friends
                  </Typography>
                  <MdArrowDropDown />
                </div>
              </div>
            </div>
          </div>
          <textarea
            onClick={() => setEmojiOpen(false)}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            rows={4}
            className="form-control my-2 border-0 shadow-none text-area"
            placeholder={`Whats on your mind, ${user?.f_name}?`}
          ></textarea>
          <div className="d-flex justify-content-between">
            <div className="colors">Color</div>
            <div className="emojis  position-relative">
              <BsEmojiSmile
                onClick={() => setEmojiOpen(!emojiOpen)}
                cursor={"pointer"}
                size={20}
              />
              <EmojiPicker
                value={status}
                onEmojiClick={(e) => setStatus(status + e.emoji)}
                open={emojiOpen}
                style={{ transform: "translate(100%,-100%)" }}
                className="position-absolute top-0 end-0"
              />
            </div>
          </div>
          <div className="border my-2 rounded-2 p-3 d-flex justify-content-between">
            <Typography className="fw-semibold">Add to your post</Typography>
            <div className="d-flex gap-2">
              <img
                src="/icons/photos.webp"
                width={30}
                className="cursor-pointer"
                alt="icon post images"
              />
              <img
                src="/icons/video.png"
                width={30}
                className="cursor-pointer"
                alt="icon post images"
              />
            </div>
          </div>
          <Button
            disabled={btnDisabled}
            variant="contained"
            className={`w-100 ${btnDisabled ? "btn-secondary" : ""} `}
          >
            Add Post
          </Button>

          <PrivacyBox />
        </Box>
      </Modal>
    </>
  );
}
