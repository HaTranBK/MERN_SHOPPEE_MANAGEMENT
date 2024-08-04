import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
const UserList = () => {
  const [users, setUsers] = useState([]);
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
    users.forEach((user, index) => {
      const { firstname, lastname, email, phone, password, gender, account } =
        user;
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
  useEffect(() => {
    const fecthUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/users"
        );
        console.log("response in userList: ", response);
        setUsers(response.data.users);
      } catch (error) {
        console.log("error from get all Users: ", error);
      }
    };
    fecthUser();
  }, []);
  const renderUserList = () => {
    PassesDataTable();
    return (
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        className="me-5"
      />
    );
  };
  return (
    <div>
      <div className="relative">
        <h2 className="text-2xl font-bold pb-3">User List</h2>
        <p className="underlined"></p>
      </div>
      <div>{renderUserList()}</div>
    </div>
  );
};

export default UserList;
