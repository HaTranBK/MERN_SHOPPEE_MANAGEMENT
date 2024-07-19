import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { userState } from "../../redux/userReducer";
const UserInformations = () => {
  const { user } = useSelector(userState);
  return (
    <>
      <FontAwesomeIcon icon={faUser} className="mt-1" />
      <span>
        {user.firstname} {user.lastname}
      </span>
    </>
  );
};

export default UserInformations;
