import { Alert, Button, FormControl, InputLabel, TextField } from "@mui/material";
import React from "react";
import { useAuth } from "../../contexts/AuthUser.context";
import { ApplicationUser, AppUser } from "../../models/user";
import FormContainer from "../FormContainer/FormContainer";
import * as yup from "yup";
import { phoneRegExp, zipRegex } from "../../shared/util";
import { FormikValues, useFormik } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../shared/firebase.config";

const DemographicInfoFrom = () => {
  const currentUser: AppUser = useAuth().currentUser;
  const [formUpdateSuccess, setFormUpdateSuccess] = React.useState(false);
  const [formUpdateFailed, setFormUpdateFailed] = React.useState(false);

  const { email, phone, address } = currentUser as ApplicationUser;

  let initialValues = {
    phone: phone || "",
    add_line1: address?.add_line1 || "",
    add_line2: address?.add_line2 || "",
    add_line3: address?.add_line3 || "",
    city: address?.city || "",
    state: address?.state || "",
    zip: address?.zip || "",
  };

  const validationSchema = yup.object({
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Must be a valid phone number without country code"),
    add_line1: yup
      .string()
      .required("Address line 1 is required")
      .min(3, "Must be 3-24 characters long")
      .max(24, "Must be 3-24 characters long"),
    add_line2: yup
      .string()
      .nullable()
      .min(3, "Must be 3-24 characters long")
      .max(24, "Must be 3-24 characters long"),
    add_line3: yup
      .string()
      .nullable()
      .min(3, "Must be 3-24 characters long")
      .max(24, "Must be 3-24 characters long"),
    city: yup
      .string()
      .required("City is required")
      .min(3, "Must be 3-24 characters long")
      .max(24, "Must be 3-24 characters long"),
    state: yup
      .string()
      .required("State is required and valid")
      .min(3, "Must be 3-24 characters long")
      .max(24, "Must be 3-24 characters long"),
    zip: yup
      .string()
      .required("Zip code is required")
      .matches(zipRegex, "Must be a valid Zip code")
      .min(3, "Must be 3-24 characters long")
      .max(24, "Must be 3-24 characters long"),
  });

  const onSubmit = (values: FormikValues) => {
    console.log({ values });
    const docRef: any = doc(db, "users", `${currentUser?.uid}`);

    const contactInfo: any = {
      address: {
        ...values,
        add_line2: values.add_line2 || null,
        add_line3: values.add_line3 || null,
      },
      phone: values?.phone,
    };
    delete contactInfo?.address?.phone;

    updateDoc(docRef, contactInfo)
      .then(() => {
        setFormUpdateSuccess(true);
      })
      .catch((error) => {
        console.error({ contact_info_form_submit_error: error });
        setFormUpdateFailed(true);
      })
      .finally(() => {
        formik.resetForm();
        formik.setValues(values as any);
        initialValues = { ...(values as any) };
        setTimeout(() => {
          setFormUpdateSuccess(false);
          setFormUpdateFailed(false);
        }, 10000);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <section className='my-4'>
      <FormContainer title='Contact Information'>
        {!address && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            Incomplete Contact Information. Please complete.
          </Alert>
        )}
        {formUpdateSuccess && (
          <Alert variant='standard' severity='success' className='mb-4'>
            Contact Information updated successfully
          </Alert>
        )}
        {formUpdateFailed && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            Failed to submit. Please try again later.
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className='row'>
            <div className='col-12 col-md-4 col-xl-3'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='email'
                  label='Email'
                  type='text'
                  size='small'
                  required
                  disabled
                  value={email}
                  helperText={`Email can't be updated`}
                />
              </FormControl>
            </div>
            <div className='col-12 col-md-4 col-xl-3'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='phone'
                  label='Phone'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.phone && formik?.errors?.phone ? true : false}
                  helperText={formik.errors.phone as string}
                />
              </FormControl>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-4 col-xl-3'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='add_line1'
                  label='Address Line 1'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.add_line1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.add_line1 && formik?.errors?.add_line1 ? true : false}
                  helperText={formik.errors.add_line1 as string}
                />
              </FormControl>
            </div>
            <div className='col-12 col-md-4 col-xl-3'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='add_line2'
                  label='Address Line 2'
                  type='text'
                  size='small'
                  value={formik.values?.add_line2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.add_line2 && formik?.errors?.add_line2 ? true : false}
                  helperText={formik.errors.add_line2 as string}
                />
              </FormControl>
            </div>
            <div className='col-12 col-md-4 col-xl-3'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='add_line3'
                  label='Address Line 3'
                  type='text'
                  size='small'
                  value={formik.values?.add_line3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.add_line3 && formik?.errors?.add_line3 ? true : false}
                  helperText={formik.errors.add_line3 as string}
                />
              </FormControl>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-4 col-xl-3'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='zip'
                  label='Zip code'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.zip && formik?.errors?.zip ? true : false}
                  helperText={formik.errors.zip as string}
                />
              </FormControl>
            </div>
            <div className='col-12 col-md-4 col-xl-3'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='city'
                  label='City'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.city && formik?.errors?.city ? true : false}
                  helperText={formik.errors.city as string}
                />
              </FormControl>
            </div>
            <div className='col-12 col-md-4 col-xl-3'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='state'
                  label='State'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.state && formik?.errors?.state ? true : false}
                  helperText={formik.errors.state as string}
                />
              </FormControl>
            </div>
          </div>
          <div className='row'>
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

export default DemographicInfoFrom;
