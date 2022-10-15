import React from "react";
import AuthForm from "../../components/forms/AuthForm";
import PageTitle from "../../components/PageTitle";

const Login = () => {
  return (
    <>
      <PageTitle title='Login' />
      <AuthForm form='SIGNIN' />
    </>
  );
};

export default Login;
