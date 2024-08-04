import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import axios from "axios";
import "./Admin.css";
import EditProductForm from "../EditForm/EditProductForm";
import EditAdmin from "../EditForm/EditAdmin";
const AdminList = () => {
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const [openUpdateAdmin, setOpenUpdateAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({});
  const [updatedAdmin, setUpdatedAdmin] = useState({});
  let data = [];
  const democss = "bg-orange-500 text-white";
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",

      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
          children: [
            {
              text: "Yellow",
              value: "Yellow",
            },
            {
              text: "Pink",
              value: "Pink",
            },
          ],
        },
        {
          text: "Category 2",
          value: "Category 2",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: "30%",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Account",
      dataIndex: "account",
    },
    {
      title: "Password",
      dataIndex: "password",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
  ];

  const PassesDataTable = () => {
    admins.forEach((admin, index) => {
      const { firstname, lastname, email, phone, password, gender, account } =
        admin;
      data.push({
        key: index,
        firstname,
        lastname,
        email,
        account,
        phone,
        password,
        gender,
      });
    });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const fecthAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/admins"
      );
      console.log("response in adminList: ", response);
      setAdmins(response.data.admins);
    } catch (error) {
      console.log("error from get all admins: ", error);
    }
  };

  useEffect(() => {
    fecthAdmin();
  }, []);
  const renderAdminList = () => {
    PassesDataTable();
    return (
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        className="me-5"
        onRow={(record, rowIndex) => {
          // console.log("record - rowIndex: ", record, rowIndex);
          return {
            onClick: (event) => {
              const newRecord = { ...record, rowIndex };
              // console.log("newRecord: ", newRecord);
              // console.log("record - rowIndex: ", record, rowIndex);
              setOpenUpdateAdmin(true);
              setUpdatedAdmin(newRecord);
              // console.log("event", event);
            }, // click row
          };
        }}
      />
    );
  };
  const handleAddAdmin = async () => {
    try {
      const { firstname, lastname, email, phone, gender, password, account } =
        newAdmin;
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/admin/addnew",
        { firstname, lastname, email, phone, gender, password, account }
      );
      console.log("response in handle add new admin: ", response);
      setNewAdmin({});
      setTimeout(() => setOpenAddAdmin(false), 1500);
      setTimeout(() => fecthAdmin(), 2000);
    } catch (error) {
      console.log("error from add new admin: ", error);
    }
  };
  return (
    <div>
      <div className="relative">
        <h2 className="text-2xl font-bold pb-3">Admin List</h2>
        <p className="underlined"></p>
      </div>
      <div className="text-right me-6 mb-4">
        <button
          className="py-3 px-4 bg-orange-400 text-white rounded-sm"
          onClick={() => setOpenAddAdmin(true)}
        >
          + ADD
        </button>
      </div>
      <div>{renderAdminList()}</div>
      <Modal
        open={openAddAdmin}
        title="Add new Admin"
        onOk={handleAddAdmin}
        onCancel={() => setOpenAddAdmin(false)}
        footer={[
          <button
            onClick={() => {
              setNewAdmin({});
              setOpenAddAdmin(false);
            }}
            className="px-3 py-2 bg-gray-200 me-3 rounded-md hover:bg-gray-300"
          >
            Return
          </button>,

          <button
            key="submit"
            loading={loading}
            onClick={handleAddAdmin}
            className="bg-orange-500 text-white hover:bg-orange-400 px-4 py-2 rounded-md "
          >
            Complete Add
          </button>,
        ]}
      >
        <div>
          <EditAdmin
            passedDataProduct={JSON.parse(JSON.stringify(newAdmin))}
            setPassedDataProduct={setNewAdmin}
          />
        </div>
      </Modal>

      <Modal
        open={openUpdateAdmin}
        title="Update Admin Information"
        // onOk={handleAddAdmin}
        onCancel={() => setOpenUpdateAdmin(false)}
        footer={[
          <button
            onClick={() => setOpenUpdateAdmin(false)}
            className="px-3 py-2 bg-gray-200 me-3 rounded-md hover:bg-gray-300"
          >
            Return
          </button>,

          <button
            key="submit"
            loading={loading}
            onClick={handleAddAdmin}
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
  );
};

export default AdminList;
