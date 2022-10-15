import React from "react";
import AuthForm from "../../components/forms/AuthForm";
import PageTitle from "../../components/PageTitle";

function Register() {
  return (
    <>
      <PageTitle title='Register' />
      <AuthForm form='SIGNUP' />
    </>
  );
}

export default Register;

//
