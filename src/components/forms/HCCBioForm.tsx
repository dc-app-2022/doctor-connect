import React from "react";
import { AppUser, HCCbio } from "../../models/user";
import FormGroup from "../form-elements/FormGroup";
import { useAuth } from "../../contexts/AuthUser.context";
import FormContainer from "../FormContainer/FormContainer";
import { FormikValues, useFormik } from "formik";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../shared/firebase.config";
import yup from "../../shared/yup_handler";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const HCCBioForm = () => {
  const currentUser: AppUser = useAuth().currentUser;
  const bio: HCCbio = currentUser?.bio as HCCbio;
  const [formUpdateSuccess, setFormUpdateSuccess] = React.useState(false);
  const [formUpdateFailed, setFormUpdateFailed] = React.useState(false);
  const expDropDown: any[] = new Array(40).fill("");

  let initialValues = {
    display_name: bio?.display_name || "",
    summary: bio?.summary || "",
  };

  const validationSchema = yup.object({
    display_name: yup
      .string()
      .required("Public name is required | Ex: St. John’s Hospital")
      .min(3, "Must be 3-48 characters long")
      .max(48, "Must be 3-48 characters long"),
    summary: yup
      .string()
      .required(
        "Description is required | St. John’s Hospital is a Registered Charity under the Charities Acts (Registered Charity No. 20000394) and is administered and managed in accordance with a Hospital Constitution approved by the Charities Regulatory Authority.  The current Hospital Constitution was approved in 2018.  The property is vested in Trustees."
      )
      .min(16, "Must be 16-500 characters long")
      .max(500, "Must be 16-500 characters long"),
  });

  const onSubmit = (values: FormikValues) => {
    console.log({ values });
    const docRef: any = doc(db, "users", `${currentUser?.uid}`);
    updateDoc(docRef, { bio: values })
      .then(() => {
        setFormUpdateSuccess(true);
      })
      .catch((error) => {
        console.error({ personal_infor_form_submit_error: error });
        setFormUpdateFailed(true);
      })
      .finally(() => {
        formik.setSubmitting(false);
        setTimeout(() => {
          setFormUpdateSuccess(false);
          setFormUpdateFailed(false);
        }, 10000);
      });
  };

  const handleFormReset = () => {};

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <section className='my-4'>
      <FormContainer title='Bio'>
        {!bio && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            Your Bio is incomplete. Please complete below form.
          </Alert>
        )}
        {formUpdateSuccess && (
          <Alert variant='standard' severity='success' className='mb-4'>
            Bio updated successfully
          </Alert>
        )}
        {formUpdateFailed && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            Failed to submit. Please try again later.
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className='row'>
            <div className='col-12 col-md-4'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='display_name'
                  label='Display name'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.display_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik?.touched?.display_name && formik?.errors?.display_name ? true : false
                  }
                  helperText={
                    (formik?.touched?.display_name && (formik.errors.display_name as string)) ||
                    "Ex: Ex: St. John’s Hospital"
                  }
                />
              </FormControl>
            </div>

            <div className='col-12'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='summary'
                  label='Short description'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.summary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.summary && formik?.errors?.summary ? true : false}
                  helperText={
                    (formik?.touched?.summary && (formik.errors.summary as string)) ||
                    "Ex: Dr. Robert is a Paediatric Cardiac Surgeon of high acclaim, practicing successfully for more than 21+ years. Dr. Robert Coelho holds the record of performing 6100+ surgeries treating children with congenital and rheumatic heart diseases across 30 countries."
                  }
                />
              </FormControl>
            </div>
            <div className='col-12'>
              <Button
                disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                variant='contained'
                size='large'
                fullWidth={window.innerWidth < 769}
                type='submit'
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </FormContainer>
    </section>
  );
};

export default HCCBioForm;
