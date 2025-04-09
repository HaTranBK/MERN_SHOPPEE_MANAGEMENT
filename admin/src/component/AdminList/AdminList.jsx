import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";

// import "./Admin.css";
import { addNew, delete_, getAdmins, update_ } from "../../service/APICall";
import CustomModal from "../CustomModal/CustomModal";
import { EditOutlined } from "@ant-design/icons";
import DeletePopup from "../../../../client/shoppee-project/src/component/Modal/Modal";
import { Button } from "antd";
const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const [openUpdateAdmin, setOpenUpdateAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({});
  const [updatedAdmin, setUpdatedAdmin] = useState({});

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          />
          <DeletePopup
            reason={"Xoá Admin"}
            contents={"Bạn có chắc muốn xóa admin này !"}
            type={"delAdmin"}
            handleDeleteCartItem={handleDeleteAdmin}
            itemId={record._id}
            popupDeleteAdminProduct={true}
            style={{ marginLeft: 8 }}
          />
        </span>
      ),
    },
  ];

  const handleEditClick = (record) => {
    setOpenUpdateAdmin(true);
    setUpdatedAdmin(record);
    console.log("record in handleEditClick: ", record);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const fecthAdmin = async () => {
    try {
      const response = await getAdmins();
      setAdmins(response.data.admins);
    } catch (error) {
      console.log("error from get all admins: ", error);
    }
  };

  useEffect(() => {
    fecthAdmin();
  }, []);
  console.log("re render: ", openUpdateAdmin);
  const renderAdminList = () => {
    return (
      <Table
        columns={columns}
        dataSource={admins}
        onChange={onChange}
        className="me-5"
      />
    );
  };

  const handleUpdateAdmin = async () => {
    try {
      // nếu dùng spread operator để clone state thì sẽ tạo ra shallow copy chứ khong như clone object bình thường
      //       để tạo deep copy thì dùng const oldState = { a: 1, b: { c: 2 } };
      // const newState = JSON.parse(JSON.stringify(oldState));
      const update = {
        ...updatedAdmin,
        _id: admins[updatedAdmin.rowIndex]._id,
      };
      // console.log("update: ", update);
      await update_(update, "admin");
      setUpdatedAdmin({});
      setTimeout(() => setOpenUpdateAdmin(false), 1000);
      setTimeout(() => fecthAdmin(), 1500);
    } catch (error) {
      console.log("error from handle update admin: ", error);
    }
  };

  const handleAddAdmin = async () => {
    try {
      await addNew(newAdmin, "admin");
      setNewAdmin({});
      setTimeout(() => setOpenAddAdmin(false), 1500);
      setTimeout(() => fecthAdmin(), 2000);
    } catch (error) {
      console.log("error from add new admin: ", error);
    }
  };

  const handleDeleteAdmin = async (_id) => {
    console.log("_id on admin handleDelete: ", _id);
    try {
      await delete_(_id, "admin");
      setUpdatedAdmin({});
      setTimeout(() => setOpenUpdateAdmin(false), 1000);
      setTimeout(() => fecthAdmin(), 1500);
    } catch (error) {
      console.log("error in handle delete admin account: ", error);
    }
  };
  const handleCancelAdd = async () => {
    setOpenAddAdmin(false);
  };
  const handleCancelUpdate = async () => {
    setOpenUpdateAdmin(false);
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

      <CustomModal
        open={openAddAdmin}
        title={"Add new Admin"}
        handleCancel={handleCancelAdd}
        handleOk={handleAddAdmin}
        typeModal="ADD"
        typeContent="user"
        content={newAdmin}
        setContent={setNewAdmin}
      />

      <CustomModal
        open={openUpdateAdmin}
        title={"Update Admin Information"}
        handleCancel={handleCancelUpdate}
        handleOk={handleUpdateAdmin}
        typeModal="update"
        typeContent="user"
        content={updatedAdmin}
        setContent={setUpdatedAdmin}
      />
    </div>
  );
};

export default AdminList;
