import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getAdminProducts } from "../../service/APICall";
import CustomModal from "../CustomModal/CustomModal";
import DeletePopup from "../../../../client/shoppee-project/src/component/Modal/Modal";
import {
  addnewAdminProduct,
  deleteAdminProduct,
  updateAdminProduct,
} from "../../service/AdminProductAPICall";

const ProductList = () => {
  const democss = "bg-orange-500 text-white";
  const [products, setProducts] = useState([]);
  //Không nên dderer biến data như này, đưa vào state để re render.
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({});
  const [newProduct, setNewProduct] = useState({});

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
    ,
    // FIX: Add more column actions for "edit", delete, view detail of table's row  (Updated)
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
            reason={"Xoá sản phẩm"}
            contents={"Bạn có chắc muốn xóa sản phẩm này !"}
            type={"delProductAdmin"}
            handleDeleteCartItem={handleDeleteProduct}
            itemId={record._id}
            popupDeleteAdminProduct={true}
            style={{ marginLeft: 8 }}
          />
        </span>
      ),
    },
  ];

  const handleEditClick = (record) => {
    setOpen(true);
    setUpdatedFields(record);
    console.log("record in handleEditClick: ", record);
  };

  // const handleDeleteClick = (record) => {
  //   console.log("vaof handle delete click", record._id);

  //   return (
  //     <DeletePopup
  //       reason={"Xoá sản phẩm"}
  //       contents={"Bạn có chắc muốn xóa sản phẩm này !"}
  //       type={"delProductAdmin"}
  //       // handleDeleteCartItem={handleDeleteProduct}
  //       itemId={record._id}
  //       popupDeleteAdminProduct="true"
  //     />
  //   );
  // };
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
      await addnewAdminProduct(newProduct);
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const fetchProduct = async () => {
    try {
      const response = await getAdminProducts();
      setProducts(response.data.AllAdminProducts);
    } catch (error) {
      console.log("error from get all Products: ", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const renderProductList = () => {
    return (
      <Table
        columns={columns}
        dataSource={products}
        onChange={onChange}
        className="me-5"
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
      };
      // console.log("update: ", update);
      await updateAdminProduct(update);
      fetchProduct();
    } catch (error) {
      console.log("error from handle update admin product: ", error);
    }
  };

  const handleDeleteProduct = async (_id) => {
    try {
      console.log("_id in delete product: ", _id);
      await deleteAdminProduct(_id);
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

      <CustomModal
        open={open}
        title={"Edit Product Information"}
        handleCancel={handleCancel}
        handleOk={handleOk}
        typeModal="Complete Updating"
        typeContent="product"
        content={updatedFields}
        setContent={setUpdatedFields}
      />

      {/* FIX: Write a custome model (Updated)*/}
      <CustomModal
        open={openAdd}
        title="Add Product"
        handleCancel={handleCancelAdd}
        handleOk={handleOkAdd}
        typeModal="ADD"
        typeContent="product"
        content={newProduct}
        setContent={setNewProduct}
      />
    </div>
  );
};

export default ProductList;
