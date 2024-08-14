import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateIsLogIn } from "../../redux/userReducer";
import { removeLocalStorageItem } from "../../utils/localStorage";
import { DeleteOutlined } from "@ant-design/icons";
import { LogOut } from "../../service/userAPICallClient";
const CustomModal = ({
  reason,
  contents,
  type,
  handleDeleteCartItem = null,
  buttonName = "",
  userId = "",
  itemId = "",
  popupDeleteAdminProduct = "",
}) => {
  let timeOutLogin, timeOutnavigate;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };
  // console.log("popupdelete admin: ", popupDeleteAdminProduct);
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
    else if (type === "delProductAdmin") {
      handleDeleteCartItem(itemId);
      setOpen(false);
    } else if (type === "delAdmin") {
      handleDeleteCartItem(itemId);
      setOpen(false);
    }
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
      await LogOut();
      handleCancel();
      removeLocalStorageItem("userToken");
      removeLocalStorageItem("User");
      dispatch(updateIsLogIn(false));
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
        {popupDeleteAdminProduct === true ? (
          <Button icon={<DeleteOutlined />} />
        ) : (
          buttonName
        )}
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
          <span
            className="px-3 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-500 inline-block cursor-pointer"
            onClick={() => handleClick()}
            style={{ backgroundColor: "orange" }}
            key={"2"}
          >
            {reason}
          </span>,
        ]}
      >
        <p>{contents}</p>
      </Modal>
    </>
  );
};
export default CustomModal;
