import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Popover } from "antd";
import CustomModal from "../../../../client/shoppee-project/src/component/Modal/Modal";
const AdminInformation = ({ admin }) => {
  // const text = <span>Title</span>;
  console.log("user in userinformation: ", admin);

  const content = (
    <div>
      <CustomModal
        reason={"Đăng xuất"}
        contents={"Bạn có chắc muốn đăng xuất !"}
        type="logout"
        buttonName="Đăng xuất"
      />
      <p>Content</p>
    </div>
  );

  return (
    <>
      <ConfigProvider>
        <Popover placement="rightBottom" content={content}>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-white text-orange-500 me-1 flex justify-center">
              <FontAwesomeIcon icon={faUser} className="mt-1" />
            </div>

            <span className="text-white">
              {admin?.firstname} {admin?.lastname}
            </span>
          </div>
        </Popover>
      </ConfigProvider>
    </>
  );
};

export default AdminInformation;
