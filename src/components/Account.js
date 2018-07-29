import React from "react";
import { PasswordChangeForm } from "./PasswordChange";
import "./App.css";

const AccountPage = () => {
  return (
    <div className="pageWrapper">
      <h1>Account Page</h1>
      <h2>Change Password?</h2>
      <PasswordChangeForm />
    </div>
  );
};

export default AccountPage;
