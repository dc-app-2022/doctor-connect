import React, { useState } from "react";
import "./AuthForm.scss";
import FormGroup from "../form-elements/FormGroup";
import { TextField, Button, Grid, Typography, Alert } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../shared/firebase.config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { isFormElement } from "react-router-dom/dist/dom";
import { useAuth } from "../../contexts/AuthUser.context";

interface AuthFormProps {
  form: "SIGNUP" | "SIGNIN" | "RESET";
  onSubmit?: Function;
}

const AuthForm = (props: AuthFormProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [submitSuccess, setSubmitSuccess] = useState<string | undefined>();
  const form = props.form;
  const formTitle =
    form === "SIGNUP" ? "Create Account" : form === "SIGNIN" ? "Sign In" : "Reset Password";

  const redirectToHomein2Sec = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const initialValues = { email: undefined, password: undefined };
  const onSubmit = (formValues: { email: any; password: any }) => {
    setSubmitError(undefined);
    setSubmitSuccess(undefined);
    const { email, password } = formValues;

    switch (form) {
      case "SIGNUP":
        createUserWithEmailAndPassword(auth, email as string, password as string)
          .then((userCred: UserCredential) => {
            console.log({ userCred });
            setSubmitSuccess("Account created successfully. 👍");
            return setDoc(doc(db, "users", userCred.user.uid), {
              email,
              uid: userCred.user.uid,
            });
          })
          .then(() => {
            redirectToHomein2Sec();
          })
          .catch((error) => {
            console.error({ error });
            setSubmitError("Oops...! Account not created. [" + error.code.split("/")[1] + "]");
            handleReset();
          });
        break;
      case "SIGNIN":
        signInWithEmailAndPassword(auth, email as string, password as string)
          .then(() => {
            setSubmitSuccess("Authentication successful. 👍");
            redirectToHomein2Sec();
          })
          .catch((error) => {
            console.error({ error });
            setSubmitError("Oops...! Authentication failed. [" + error.code.split("/")[1] + "]");
            handleReset();
          });
        break;
      case "RESET":
        sendPasswordResetEmail(auth, email as string)
          .then(() => {
            setSubmitSuccess("Password reset email sent successfully 👍. Please check your inbox.");
          })
          .catch((error) => {
            console.error({ error });
            setSubmitError(
              "Oops...! Password reset email failed. [" + error.code.split("/")[1] + "]"
            );
            handleReset();
          });
        break;
      default:
        console.error("Invalid action");
    }
  };

  let validationSchema = undefined;
  if (form === "RESET") {
    validationSchema = yup.object({
      email: yup
        .string()
        .email("Must be a valid email address")
        .required("Valid email address is required"),
    });
  } else {
    validationSchema = yup.object({
      email: yup
        .string()
        .email("Must be valid email address")
        .required("Email address is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be 6-12 characters long")
        .max(12, "Password must be 6-12 characters long"),
    });
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleReset = () => {
    formik.resetForm({ values: undefined, isSubmitting: false });
  };

  if (isLoggedIn === true) {
    return <Navigate to='/' />;
  }

  return (
    <section className='auth-container vh-100 d-flex justify-content-center align-items-center'>
      <div className='auth-card'>
        <div className='theme-container'></div>
        <div className='form-conatiner pt-4'>
          <Typography variant='h4' className='mb-4'>
            {formTitle}
          </Typography>
          <FormGroup className='mb-2'>
            {form == "SIGNIN" && (
              <>
                <Typography variant='body2'>
                  Don't have an account? <Link to='/register'>Register</Link>
                </Typography>
                <Typography variant='body2'>
                  Forgot password? <Link to='/reset'>Password reset</Link>
                </Typography>
              </>
            )}
            {form == "SIGNUP" && (
              <Typography variant='body2'>
                Already registered? <Link to='/login'>Login</Link>
              </Typography>
            )}
            {form == "RESET" && (
              <Typography variant='body2'>
                Want to login? <Link to='/login'>Login here</Link>
              </Typography>
            )}
          </FormGroup>
          {submitError && <Alert severity='error'>{submitError}</Alert>}
          {submitSuccess && <Alert severity='success'>{submitSuccess}</Alert>}
          <form className='mt-3 mb-4' onSubmit={formik.handleSubmit} onReset={handleReset}>
            <FormGroup>
              <TextField
                name='email'
                label='Email'
                variant='outlined'
                autoComplete='off'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                type={"email"}
                error={formik?.touched?.email && formik?.errors?.email ? true : false}
                helperText={formik.errors.email || "Must be a valid email address"}
              />
            </FormGroup>
            {form !== "RESET" && (
              <FormGroup>
                <TextField
                  name='password'
                  label='Password'
                  variant='outlined'
                  type={"password"}
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.password && formik?.errors?.password ? true : false}
                  helperText={formik.errors.password || "Password must be 6-12 char long"}
                />
              </FormGroup>
            )}

            <Grid container spacing={2}>
              <Grid item>
                <Button
                  size='large'
                  variant='contained'
                  type='submit'
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Grid>
              <Grid item>
                <Button size='large' variant='text' color='secondary' type='reset'>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
