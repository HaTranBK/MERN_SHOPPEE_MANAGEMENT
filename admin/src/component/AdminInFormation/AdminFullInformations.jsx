import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminInfor.css";
import { Button, Modal } from "antd";
import { TextField } from "@mui/material";
import EditForm from "../EditForm/EditForm";
import Password from "antd/es/input/Password";
const AdminFullInformations = () => {
  const [admin, setAdmin] = useState({
    firstname: "ngọc hà",
    lastname: "trần",
    email: "ngocha6@gm.com",
    phone: "0367438763",
    account: "ngocha",
    password: "ngocha8751",
  });
  const informationType = [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Account",
    "password",
  ];
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await axios.get(
  //         "http://localhost:8000/api/v1/user/admin/me",
  //         {}
  //       );
  //     };

  //     return () => {
  //       second;
  //     };
  //   }, [third]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const renderInformation = () => {
    return Object.entries(admin).map(([key, value], index) => {
      console.log("key - value: ", key, value);
      return (
        <div className="flex flex-col justify-center">
          <span className="font-semibold">{informationType[index]}: </span>
          <span className="ps-4">- {value}</span>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="AdminInformation w-full">
        <div className="py-4 InforTitle">
          <h2 className="text-black text-2xl font-bold">INFORMATION</h2>
        </div>
        <div className="w-3/5 mx-auto text-center grid grid-cols-2 gap-3">
          {renderInformation()}
        </div>
        <div className="text-center">
          <button
            className="px-5 py-3 bg-yellow-600 rounded-md"
            onClick={() => setOpen(true)}
          >
            Edit
          </button>
          <Modal
            open={open}
            title="Edit Admin Information"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <button
                onClick={handleCancel}
                className="px-3 py-2 bg-gray-200 me-3 rounded-md hover:bg-gray-300"
              >
                Return
              </button>,
              <button
                key="submit"
                loading={loading}
                onClick={handleOk}
                className="bg-orange-500 text-white hover:bg-orange-400 px-4 py-2 rounded-md "
              >
                Submit
              </button>,
            ]}
          >
            <div>
              <EditForm admin={admin} setAdmin={setAdmin} />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdminFullInformations;
