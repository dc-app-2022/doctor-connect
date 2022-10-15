import React from "react";
import AuthForm from "../../components/forms/AuthForm";
import PageTitle from "../../components/PageTitle";

function ResetPassword() {
  return (
    <>
      <PageTitle title='Password Reset' />
      <AuthForm form='RESET' />
    </>
  );
}

export default ResetPassword;

//
