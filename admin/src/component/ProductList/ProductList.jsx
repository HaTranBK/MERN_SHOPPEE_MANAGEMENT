import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import axios from "axios";
import ColumnGroup from "antd/es/table/ColumnGroup";
import EditProductForm from "../EditForm/EditProductForm";
const ProductList = () => {
  const democss = "bg-orange-500 text-white";
  const [products, setProducts] = useState([]);
  let data = [];
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({});
  const [newProduct, setNewProduct] = useState({});
  const [passedDataProduct, setPassedDataProduct] = useState({});

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setLoading(true);
    handleUpdateProduct();

    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };

  const handleOkAdd = async () => {
    // setLoading(true);
    try {
      console.log("newProduct: ", newProduct);
      const responseNewProduct = await axios.post(
        "http://localhost:8000/api/v1/adproduct/add-adminproduct",
        {
          newProduct,
        }
      );

      console.log("newProduct: ", responseNewProduct);
      setNewProduct({});
      fetchProduct();
      setTimeout(() => {
        // setLoading(false);
        setOpenAdd(false);
      }, 1000);
    } catch (error) {
      console.log("error from add admin product: ", error);
    }
  };

  const handleCancelAdd = () => {
    setNewProduct({});
    setOpenAdd(false);
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",

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
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Thumb",
      dataIndex: "thumb",
      render: (text, record) => (
        <img src={record.thumb} style={{ width: "100px" }} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
  ];

  const PassesDataTable = () => {
    products.forEach((item) => {
      const { name, price, category, quantity, thumb } = item;
      data.push({ name, price, category: category[0], quantity, thumb });
    });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/adproduct/get-adminproducts"
      );
      console.log("response in product list: ", response);
      setProducts(response.data.AllAdminProducts);
    } catch (error) {
      console.log("error from get all Products: ", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const renderProductList = () => {
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
              setOpen(true);
              setUpdatedFields(newRecord);
              // console.log("event", event);
            }, // click row
          };
        }}
      />
    );
  };

  const handleUpdateProduct = async () => {
    try {
      // nếu dùng spread operator để clone state thì sẽ tạo ra shallow copy chứ khong như clone object bình thường
      //       để tạo deep copy thì dùng const oldState = { a: 1, b: { c: 2 } };
      // const newState = JSON.parse(JSON.stringify(oldState));
      const update = {
        ...updatedFields,
        _id: products[updatedFields.rowIndex]._id,
      };
      // console.log("update: ", update);
      const response = await axios.post(
        "http://localhost:8000/api/v1/adproduct/update-adminproduct",
        { update }
      );
      console.log("response in handle update product: ", response);
      fetchProduct();
    } catch (error) {
      console.log("error from handle update admin product: ", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const _id = products[updatedFields.rowIndex]._id;
      const response = await axios.post(
        "http://localhost:8000/api/v1/adproduct/delete-adminproduct",
        { _id }
      );
      console.log("response in handle delete admin product: ", response);
      setUpdatedFields({});
      setTimeout(() => setOpen(false), 1000);
      setTimeout(() => fetchProduct(), 1500);
    } catch (error) {
      console.log("error from handle delete admin product: ", error);
    }
  };
  return (
    <div>
      <div className="relative">
        <h2 className="text-2xl font-bold pb-3">Products List</h2>
        <p className="underlined"></p>
      </div>
      <div className="mb-4 text-right pe-6">
        <span
          className="px-3 py-2 bg-yellow-400 text-white rounded-sm hover:bg-yellow-300 cursor-pointer"
          onClick={() => setOpenAdd(true)}
        >
          + ADD
        </span>
      </div>
      <div>{renderProductList()}</div>
      <Modal
        open={open}
        title="Edit Product Information"
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
            onClick={handleDeleteProduct}
            className="px-3 py-2 bg-red-500 me-3 rounded-md hover:bg-red-400"
          >
            Delete This Product
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
          <EditProductForm
            passedDataProduct={updatedFields}
            setPassedDataProduct={setUpdatedFields}
          />
        </div>
      </Modal>
      <Modal
        open={openAdd}
        title="Add Product"
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
        footer={[
          <button
            onClick={handleCancelAdd}
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
          <EditProductForm
            passedDataProduct={newProduct}
            setPassedDataProduct={setNewProduct}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
