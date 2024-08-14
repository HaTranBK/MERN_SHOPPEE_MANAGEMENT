import React, { useEffect } from "react";
import { useState } from "react";
// import "./AdminInfor.css";
import { Modal } from "antd";
import EditAdmin from "../EditForm/EditAdmin";
import { getUser, update_ } from "../../service/APICall";
const AdminFullInformations = () => {
  const [admin, setAdmin] = useState({});
  const [updatedAdmin, setUpdatedAdmin] = useState({});
  const informationType = [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Account",
    "password",
  ];
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const _id = "66af049bbe2e4b7203ef75fc";
      const response = await getUser(_id);
      console.log("response in fetchAdmin information: ", response);
      setAdmin(response.data.admin);
      // setAdmin()
    } catch (error) {
      console.log("error from fecth admin information: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateAdmin = async () => {
    try {
      const update = { ...updatedAdmin, _id: admin._id };
      const response = await update_(update);
      setUpdatedAdmin({});
      setTimeout(() => setOpen(false));
      setTimeout(() => setAdmin(response.data.updatedAdmin));
    } catch (error) {
      console.log("error from updated admin in admiInformation: ", error);
    }
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
            onClick={() => {
              setOpen(true);
              setUpdatedAdmin(admin);
            }}
          >
            Edit
          </button>
          <Modal
            open={open}
            title="Update Admin Information"
            // onOk={handleAddAdmin}
            onCancel={() => handleCancel(false)}
            footer={[
              <button
                onClick={() => handleCancel(false)}
                className="px-3 py-2 bg-gray-200 me-3 rounded-md hover:bg-gray-300"
              >
                Return
              </button>,

              <button
                key="submit"
                loading={loading}
                onClick={handleUpdateAdmin}
                className="bg-orange-500 text-white hover:bg-orange-400 px-4 py-2 rounded-md "
              >
                Complete Updating
              </button>,
            ]}
          >
            <div>
              <EditAdmin
                passedDataProduct={JSON.parse(JSON.stringify(updatedAdmin))}
                setPassedDataProduct={setUpdatedAdmin}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdminFullInformations;
