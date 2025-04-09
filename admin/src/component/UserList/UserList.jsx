import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import EditUserForm from "../EditForm/EditUserForm";
import { addNew, delete_, getUsers, update_ } from "../../service/APICall";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openUpdateUSer, setOpenUpdateUser] = useState(false);
  // FIX: Don't use data variable this way to render to UI  (updated)
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

  const handleCancel = () => {
    setOpenUpdateUser(false);
  };

  const handleOk = () => {
    setLoading(true);
    handleUpdateUser();

    // FIX: don't use setTimeout with no reason (updated)
    setLoading(false);
    setOpenUpdateUser(false);
  };

  const handleUpdateUser = async () => {
    try {
      // nếu dùng spread operator để clone state thì sẽ tạo ra shallow copy chứ khong như clone object bình thường
      //       để tạo deep copy thì dùng const oldState = { a: 1, b: { c: 2 } };
      // const newState = JSON.parse(JSON.stringify(oldState));
      const update = {
        ...updatedUser,
        _id: users[updatedUser.rowIndex]._id,
      };
      // console.log("update: ", update);
      await update_(update, "user");
      setUpdatedUser({});
      setTimeout(() => setOpenUpdateUser(false), 1000);
      setTimeout(() => fetchUser(), 1500);
    } catch (error) {
      console.log("error from handle update user: ", error);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const fetchUser = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.log("error from get all Users: ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const renderUserList = () => {
    return (
      <Table
        columns={columns}
        dataSource={users}
        onChange={onChange}
        className="me-5"
        onRow={(record, rowIndex) => {
          // console.log("record - rowIndex: ", record, rowIndex);
          return {
            onClick: (event) => {
              const newRecord = { ...record, rowIndex };
              // console.log("newRecord: ", newRecord);
              // console.log("record - rowIndex: ", record, rowIndex);
              setOpenUpdateUser(true);
              setUpdatedUser(newRecord);
              // console.log("event", event);
            }, // click row
          };
        }}
      />
    );
  };

  const handleDeleteUser = async () => {
    try {
      const { _id } = users[updatedUser.rowIndex];
      await delete_(_id, "user");
      setUpdatedUser({});
      // FIX: why do u use setTimeout for this
      setOpenUpdateUser(false);
      fetchUser();
    } catch (error) {
      console.log("error from deleting user: ", error);
    }
  };

  const handleOkAdd = async () => {
    // setLoading(true);
    try {
      console.log("newUser: ", newUser);
      await addNew(newUser, "user");
      setNewUser({});
      fetchUser();
      setTimeout(() => {
        // setLoading(false);
        setOpenAddUser(false);
      }, 1000);
    } catch (error) {
      console.log("error from add User: ", error);
    }
  };

  return (
    <div>
      <div className="relative">
        <h2 className="text-2xl font-bold pb-3">User List</h2>
        <p className="underlined"></p>
      </div>
      <div className="text-right">
        <button
          className="px-3 py-2 bg-orange-500 text-white rounded-sm me-5 mb-2"
          onClick={setOpenAddUser}
        >
          + ADD
        </button>
      </div>
      <div>{renderUserList()}</div>
      <Modal
        open={openUpdateUSer}
        title="Edit User Information"
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
            onClick={handleDeleteUser}
            className="px-3 py-2 bg-red-500 me-3 rounded-md hover:bg-red-400"
          >
            Delete This User
          </button>,
          <button
            key="submit"
            loading={loading}
            onClick={handleOk}
            className="bg-orange-500 text-white hover:bg-orange-400 px-4 py-2 rounded-md "
          >
            Complete Updating
          </button>,
        ]}
      >
        <div>
          <EditUserForm
            passedDataProduct={updatedUser}
            setPassedDataProduct={setUpdatedUser}
          />
        </div>
      </Modal>
      <Modal
        open={openAddUser}
        title="Add User"
        onOk={handleOkAdd}
        onCancel={() => setOpenAddUser(false)}
        footer={[
          <button
            onClick={() => setOpenAddUser(false)}
            className="px-3 py-2 bg-gray-200 me-3 rounded-md hover:bg-gray-300"
          >
            Return
          </button>,
          <button
            key="submit"
            loading={loading}
            onClick={handleOkAdd}
            className="bg-orange-500 text-white hover:bg-orange-400 px-4 py-2 rounded-md "
          >
            ADD
          </button>,
        ]}
      >
        <div>
          <EditUserForm
            passedDataProduct={newUser}
            setPassedDataProduct={setNewUser}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserList;
