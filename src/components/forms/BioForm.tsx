import React from "react";
import { AppUser, HCPbio } from "../../models/user";
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

const BioForm = () => {
  const currentUser: AppUser = useAuth().currentUser;
  const bio: HCPbio = currentUser?.bio as HCPbio;
  const [formUpdateSuccess, setFormUpdateSuccess] = React.useState(false);
  const [formUpdateFailed, setFormUpdateFailed] = React.useState(false);
  const expDropDown: any[] = new Array(40).fill("");

  let initialValues = {
    title: bio?.title || "",
    display_name: bio?.display_name || "",
    summary: bio?.summary || "",
    highest_degree: bio?.highest_degree || "",
    designation: bio?.designation || "",
    total_experience: bio?.total_experience || 0,
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    display_name: yup
      .string()
      .required("Public name is required")
      .min(3, "Must be 3-48 characters long")
      .max(48, "Must be 3-48 characters long"),
    highest_degree: yup
      .string()
      .required("Highest degree is required")
      .min(3, "Must be 3-48 characters long")
      .max(48, "Must be 3-48 characters long"),
    summary: yup
      .string()
      .required(
        "Description is required | Ex: Dr. Robert is a Paediatric Cardiac Surgeon of high acclaim, practicing successfully for more than 21+ years. Dr. Robert Coelho holds the record of performing 6100+ surgeries treating children with congenital and rheumatic heart diseases across 30 countries."
      )
      .min(16, "Must be 16-500 characters long")
      .max(500, "Must be 16-500 characters long"),
    designation: yup
      .string()
      .required("Designation is required | Ex: Sr. General Surgeon (XYZ Hospital)")
      .min(6, "Must be 6-32 characters long")
      .max(32, "Must be 6-32 characters long"),
    total_experience: yup.string().required("Designation is required"),
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
            your Bio is incomplete. Please complete below form.
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
                  name='title'
                  label='Title'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.title && formik?.errors?.title ? true : false}
                  helperText={
                    (formik.errors.title as string) ||
                    `Ex: Md | Dr. | Prof. | Asst. Prof. | Mrs. | Mr.`
                  }
                />
              </FormControl>
            </div>
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
                    "Ex: Dr Myles. B. Abbott, M.D."
                  }
                />
              </FormControl>
            </div>
            <div className='col-12 col-md-4'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='designation'
                  label='Designation'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.designation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.designation && formik?.errors?.designation ? true : false}
                  helperText={
                    (formik?.touched?.designation && (formik.errors.designation as string)) ||
                    "Ex: Sr. General Surgeon (XYZ Hospital)"
                  }
                />
              </FormControl>
            </div>
            <div className='col-12 col-md-4'>
              <FormControl
                fullWidth
                error={
                  formik?.touched?.total_experience && formik?.errors?.total_experience
                    ? true
                    : false
                }
                size='small'
                className='mb-4'
              >
                <InputLabel id='basic-info-total_experience-select-lable' required>
                  Total experience
                </InputLabel>
                <Select
                  labelId='basic-info-total_experience-select-lable'
                  id='basic-info-total_experience-select'
                  value={formik.values?.total_experience || ""}
                  label='Total experience'
                  name='total_experience'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <MenuItem value='null' disabled>
                    Select
                  </MenuItem>
                  {expDropDown.map((e, exp) => (
                    <MenuItem key={exp} value={exp}>
                      {exp < 1 ? "<" + 1 : ">" + exp} Year(s)
                    </MenuItem>
                  ))}
                </Select>
                {formik?.errors?.total_experience && formik?.touched?.total_experience && (
                  <FormHelperText>{formik.errors.total_experience as string}</FormHelperText>
                )}
              </FormControl>
            </div>
            <div className='col-12 col-md-4'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='highest_degree'
                  label='Highest Degree'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.highest_degree}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik?.touched?.highest_degree && formik?.errors?.highest_degree ? true : false
                  }
                  helperText={
                    (formik?.touched?.highest_degree && (formik.errors.highest_degree as string)) ||
                    "Ex: PhDs Mental Healthcare"
                  }
                />
              </FormControl>
            </div>
            <div className='col-12'>
              <FormControl fullWidth className='mb-4' variant='outlined'>
                <TextField
                  autoComplete='off'
                  name='summary'
                  label='Short description about you inless than 500 letters'
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

export default BioForm;
