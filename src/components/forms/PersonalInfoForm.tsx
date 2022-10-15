import React from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthUser.context";
import { ApplicationUser, AppUser, UserGender } from "../../models/user";
import FormGroup from "../form-elements/FormGroup";
import FormContainer from "../FormContainer/FormContainer";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../shared/firebase.config";

const PersonalInfoForm = (props: any) => {
  const currentUser: AppUser = useAuth().currentUser;
  const [formUpdateSuccess, setFormUpdateSuccess] = React.useState(false);
  const [formUpdateFailed, setFormUpdateFailed] = React.useState(false);

  let { first_name, middle_name, last_name, age, gender } = currentUser as ApplicationUser;

  const ageOptions: number[] = new Array(83).fill("").map((el, index) => index + 18);
  const genderOptions: UserGender[] = ["MALE", "FEMALE", "NA"];

  let initialValues: any = {
    first_name,
    middle_name: middle_name || "",
    last_name,
    age: age || "",
    gender: gender || "",
  };

  console.log({ initialValues });
  const validationSchema = yup.object({
    first_name: yup
      .string()
      .required("This feild is required.")
      .min(3, "Must be 3-16 characters long")
      .max(16, "Must be 3-16 characters long"),
    last_name: yup
      .string()
      .required("This feild is required.")
      .min(3, "Must be 3-16 characters long")
      .max(16, "Must be 3-16 characters long"),
    middle_name: yup
      .string()
      .nullable()
      .min(3, "Must be 3-16 characters long")
      .max(16, "Must be 3-16 characters long"),
    age: yup
      .number()
      .required("This feild is required.")
      .min(18, "Age must be  13-100 years")
      .max(100, "Age must be  13-100 years"),
    gender: yup.string().required("This feild is required."),
  });
  const onSubmit = (values: FormikValues) => {
    console.log({ values });
    const docRef: any = doc(db, "users", `${currentUser?.uid}`);
    const personalInfo: Partial<ApplicationUser> = { ...(values as any) };
    personalInfo.middle_name = personalInfo.middle_name || (null as any);
    updateDoc(docRef, personalInfo)
      .then(() => {
        setFormUpdateSuccess(true);
      })
      .catch((error) => {
        console.error({ personal_infor_form_submit_error: error });
        setFormUpdateFailed(true);
      })
      .finally(() => {
        formik.resetForm();
        formik.setValues(values);
        initialValues = { ...values };
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
    <section>
      <FormContainer title={"Personal Info"}>
        {(!first_name || !last_name || !age || !gender) && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            Personal info is incomplete. Please complete below form.
          </Alert>
        )}
        {formUpdateSuccess && (
          <Alert variant='standard' severity='success' className='mb-4'>
            Personal Info updated successfully
          </Alert>
        )}
        {formUpdateFailed && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            Failed to submit. Please try again later.
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className='row'>
            <div className='col-12 col-lg-4'>
              <FormGroup>
                <TextField
                  autoComplete='off'
                  name='first_name'
                  label='First name'
                  variant='outlined'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.first_name && formik?.errors?.first_name ? true : false}
                  helperText={formik?.errors?.first_name as string}
                />
              </FormGroup>
            </div>
            <div className='col-12 col-lg-4'>
              <FormGroup>
                <TextField
                  autoComplete='off'
                  name='middle_name'
                  label='Middle name'
                  variant='outlined'
                  type='text'
                  size='small'
                  value={formik.values?.middle_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.middle_name && formik?.errors?.middle_name ? true : false}
                  helperText={formik.errors.middle_name as string}
                />
              </FormGroup>
            </div>
            <div className='col-12 col-lg-4'>
              <FormGroup>
                <TextField
                  autoComplete='off'
                  name='last_name'
                  label='Last name/Surname'
                  variant='outlined'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.last_name && formik?.errors?.last_name ? true : false}
                  helperText={formik.errors.last_name as string}
                />
              </FormGroup>
            </div>
            <div className='col-12 col-lg-4'>
              <FormControl
                fullWidth
                error={formik?.touched?.age && formik?.errors?.age ? true : false}
                size='small'
                className='mb-4'
              >
                <InputLabel id='basic-info-age-select-lable' required>
                  Age
                </InputLabel>
                <Select
                  labelId='basic-info-age-select-lable'
                  id='basic-info-age-select'
                  value={formik.values?.age || ""}
                  label='Age'
                  name='age'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <MenuItem value='null' disabled>
                    Select
                  </MenuItem>
                  {ageOptions.map((age) => (
                    <MenuItem key={age} value={age}>
                      {age} Years
                    </MenuItem>
                  ))}
                </Select>
                {formik?.errors?.age && formik?.touched?.age && (
                  <FormHelperText>{formik.errors.age as string}</FormHelperText>
                )}
              </FormControl>
            </div>
            <div className='col-12 col-lg-4'>
              <FormControl
                fullWidth
                error={formik?.touched?.gender && formik?.errors?.gender ? true : false}
                size='small'
                className='mb-4'
              >
                <InputLabel id='basic-info-gender-select-lable' required>
                  Gender
                </InputLabel>
                <Select
                  labelId='basic-info-gender-select-lable'
                  id='basic-info-gender-select'
                  value={formik.values?.gender || ""}
                  label='Gender'
                  name='gender'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <MenuItem value='null' disabled>
                    Select
                  </MenuItem>
                  {genderOptions.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
                {formik?.errors?.gender && formik?.touched?.gender && (
                  <FormHelperText>{formik.errors.gender as string}</FormHelperText>
                )}
              </FormControl>
            </div>
            {!props?.readOnly && (
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
            )}
          </div>
        </form>
      </FormContainer>
    </section>
  );
};

export default PersonalInfoForm;
