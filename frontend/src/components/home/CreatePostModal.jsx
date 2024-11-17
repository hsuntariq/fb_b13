import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Fa42Group } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";
import { RiGroupFill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import PrivacyBox from "./PrivacyBox";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { postReset, uploadPostData } from "../../features/posts/postSlice";
import { toast } from "react-hot-toast";
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
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { postLoading, postError, postSuccess } = useSelector(
    (state) => state.posts
  );
  const [open, setOpen] = useState(false);
  const [showPrivacyBox, setShowPrivacyBox] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [visibility, setVisibility] = useState("public");
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  React.useEffect(() => {
    if (status.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [status]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(file);
    setImagePreview(imageUrl);
    setBtnDisabled(false);
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("upload_preset", "ls8frk5v");
    data.append("file", image);
    try {
      setImageLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwtsjgcyf/image/upload",
        data
      );
      setImageLoading(false);
      setImage(null);
      setImagePreview(null);
      return response?.data?.url;
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    }

    if (postSuccess) {
      toast.success("Post uploaded successfully!");
      setStatus("");
      setImage(null);
      setImagePreview(null);
      handleClose();
    }
    dispatch(postReset());
  }, [postError, postSuccess]);

  const handlePostUpload = async () => {
    const imageURL = await handleImageUpload(image);
    const postData = {
      content: imageURL,
      caption: status,
      visibility,
    };
    dispatch(uploadPostData(postData));
  };

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
        <Box
          sx={style}
          // style={{ overflow: "hidden" }}
          className="rounded-3 shadow-lg"
        >
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
                <div
                  onClick={() => setShowPrivacyBox(true)}
                  className="d-flex align-items-center gap-1 text-sm fw-semi-bold"
                >
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
          {/* image preview */}
          {imagePreview && (
            <img
              src={imagePreview ? imagePreview : null}
              className="prev-image w-100 border p-3 rounded-3"
              style={{ height: "200px", objectFit: "contain" }}
            />
          )}
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
              <div className="position-relative">
                <input
                  type="file"
                  name=""
                  onChange={handleImageChange}
                  className="position-absolute opacity-0"
                  id=""
                />
                <img
                  src="/icons/photos.webp"
                  width={30}
                  className="cursor-pointer"
                  alt="icon post images"
                />
              </div>
              <img
                src="/icons/video.png"
                width={30}
                className="cursor-pointer"
                alt="icon post images"
              />
            </div>
          </div>
          <Button
            onClick={handlePostUpload}
            disabled={btnDisabled || imageLoading || postLoading}
            variant="contained"
            className={`w-100 ${
              btnDisabled || imageLoading ? "btn-secondary" : ""
            } `}
          >
            {imageLoading ? (
              <>
                <ThreeCircles
                  visible={true}
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{ justifyContent: "center" }}
                  wrapperClass=""
                />
              </>
            ) : (
              "Add Post"
            )}
          </Button>

          <PrivacyBox
            showPrivacyBox={showPrivacyBox}
            setShowPrivacyBox={setShowPrivacyBox}
            visibility={visibility}
            setVisibility={setVisibility}
          />
        </Box>
      </Modal>
    </>
  );
}
