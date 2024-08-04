import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../../../client/shoppee-project/src/utils/localStorage";
import { useState } from "react";
import AdminInformation from "../AdminInFormation/AdminInformation";
import axios from "axios";
const HeaderAdmin = () => {
  const [admin, setAdmin] = useState({
    firstname: "",
    lastname: "",
  });
  const _id = getLocalStorageItem("admin")?._id;
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/admin/me",
          { _id }
          // {
          //   withCredentials: true,
          // }
        );

        console.log("response: ", response);
        if (!response) throw Error("Admin not found in local!");
        setAdmin(response.data.admin);
      } catch (error) {
        console.log("error in get admin in header admin: ", error);
        if (error.response.data.message === "Admin Is Not Authenticated !") {
          removeLocalStorageItem("admin");
        }
      }
    };
    fetchAdmin();
  }, []);
  return (
    <div>
      <div className="headerCart-Bottom">
        <div className="container flex justify-between items-center py-6 w-4/5">
          <div className="flex items-center justify-center">
            <Link to="/">
              <FontAwesomeIcon
                icon={faShoppingBag}
                className="text-5xl text-orange-600 me-3"
              />

              <span className="text-4xl text-orange-600 text-semibold me-3 ">
                Shoppe
              </span>
            </Link>
            <span className="text-2xl text-semibold pt-3 text-orange-600 me-3">
              |
            </span>
            <span className="text-2xl text-orange-600 inline-block mt-4">
              Admin
            </span>
          </div>
          <div>
            <AdminInformation admin={admin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
