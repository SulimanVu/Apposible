import React from "react";
import { useSelector } from "react-redux";

const UsersModal = () => {
  const usersAll = useSelector((state) => state.application.userId);
  return <div></div>;
};

export default UsersModal;
