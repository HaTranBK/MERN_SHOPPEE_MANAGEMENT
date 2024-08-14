import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Popover } from "antd";
import CustomModal from "../Modal/Modal";
import { setLocalStorageItem } from "../../utils/localStorage";
import { getUser } from "../../service/userAPICallClient";
const UserInformations = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  // const text = <span>Title</span>;
  console.log("user in userinformation: ", user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(user._id);
        setLocalStorageItem("User", response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.log("Error in useEffect in userInformation!", error);
      }
    };
    fetchUser();
  }, []);

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
              {user?.firstname} {user?.lastname}
            </span>
          </div>
        </Popover>
      </ConfigProvider>
    </>
  );
};

export default UserInformations;
