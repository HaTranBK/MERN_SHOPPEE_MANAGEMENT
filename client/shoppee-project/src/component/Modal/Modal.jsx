import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLogIn, userState } from "../../redux/userReducer";
import { removeLocalStorageItem } from "../../utils/localStorage";
const CustomModal = ({
  reason,
  contents,
  type,
  handleDeleteCartItem = null,
  buttonName = "",
  userId = "",
  itemId = "",
}) => {
  let timeOutLogin, timeOutnavigate;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeOutLogin);
      clearTimeout(timeOutnavigate);
    };
  }, []);

  const handleClick = () => {
    if (type === "logout") handleLogout();
    else if (type === "delCartItem") handleDeleteCartItem(itemId, userId);
  };

  const buttonOpenModal = () => {
    if (type === "logout")
      return "w-full hover:cursor-pointer hover:bg-slate-200";
    else if (type === "delCartItem")
      return "px-3 leading-9 bg-gray-300 border border-gray-500 hover:bg-gray-200 hover:cursor-pointer";
  };

  const handleLogout = async () => {
    try {
      console.log("ban dang vao handlelogout!");
      //lưu ý với post: là tham số thứ 2 là data, nếu không muốn truyền data gì thì phải để object rỗng, sau đó đó tham số thứ ba.
      //withCredentials:true là đính kèm và nhận cookie trong request.
      const rep = await axios.post(
        "http://localhost:8000/api/v1/user/logout-user",
        {},
        { withCredentials: true }
      );
      console.log("Log out successfully: ", rep);
      handleCancel();
      removeLocalStorageItem("userToken");
      removeLocalStorageItem("user");
      timeOutLogin = setTimeout(() => dispatch(updateIsLogIn(false)), 1000);
      timeOutnavigate = setTimeout(
        () => navigate("/pre-process/sign/signin"),
        2000
      );
    } catch (error) {
      console.log("Log out fail ! ", error);
    }
  };
  return (
    <>
      <span type="primary" onClick={showModal} className={buttonOpenModal()}>
        {buttonName}
      </span>
      <Modal
        open={open}
        title={reason}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <button
            className=" ms-3 px-3 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-500"
            onClick={() => handleClick()}
            key={"2"}
          >
            {reason}
          </button>,
        ]}
      >
        <p>{contents}</p>
      </Modal>
    </>
  );
};
export default CustomModal;
