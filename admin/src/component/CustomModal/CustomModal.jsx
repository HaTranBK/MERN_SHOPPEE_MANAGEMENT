import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import EditProductForm from "../EditForm/EditProductForm";
import EditAdmin from "../EditForm/EditAdmin";
const CustomModal = ({
  open,
  title,
  handleCancel,
  handleOk,
  typeModal = "", //update , add
  typeContent = "", //product, user
  content,
  setContent,
}) => {
  const [selectValue, setSelectValue] = useState(undefined);
  const renderModalContent = () => {
    return typeContent === "product" ? (
      <EditProductForm
        passedDataProduct={content}
        setPassedDataProduct={setContent}
        selectValue={selectValue}
        setSelectValue={setSelectValue}
      />
    ) : (
      <EditAdmin
        passedDataProduct={content}
        setPassedDataProduct={setContent}
      />
    );
  };
  useEffect(() => {
    return () => {
      console.log("re render in custom modal");
      setSelectValue(undefined);
    };
  }, [open]);
  return (
    <Modal
      open={open}
      title={title}
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
          onClick={handleOk}
          className="bg-orange-500 text-white hover:bg-orange-400 px-4 py-2 rounded-md "
        >
          {typeModal}
        </button>,
      ]}
    >
      <div>{renderModalContent()}</div>
    </Modal>
  );
};

export default CustomModal;
