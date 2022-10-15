import { Alert, Button, IconButton, TextField, Typography } from "@mui/material";
import "./PtDiagnosisForm.scss";

import { updateDoc, doc } from "firebase/firestore";
import { FormikValues, useFormik } from "formik";
import React from "react";
import { useAuth } from "../../contexts/AuthUser.context";
import { AppUser } from "../../models/user";
import { db } from "../../shared/firebase.config";
import yup from "../../shared/yup_handler";
import FormGroup from "../form-elements/FormGroup";
import FormContainer from "../FormContainer/FormContainer";
import DiagnosisList from "../DiagnosisList/DiagnosisList";

const PtDiagnosisForm = () => {
  const currentUser: AppUser = useAuth().currentUser;
  let diagnosis_history = currentUser?.diagnosis_history || [];
  const [formUpdateSuccess, setFormUpdateSuccess] = React.useState(false);
  const [formUpdateFailed, setFormUpdateFailed] = React.useState(false);

  const initialValues = {
    summary: "",
    description: "",
  };

  const validationSchema = yup.object({
    summary: yup
      .string()
      .required("Diagnosis summary is required")
      .min(3, "Must be 3 - 50 characters long")
      .max(50, "Must be 3 - 50 characters long"),
    description: yup
      .string()
      .min(20, "Must be 20 - 500 characters long")
      .max(500, "Must be 20 - 500 characters long"),
  });

  const onSubmit = (values: FormikValues) => {
    const diagnosis = { ...values };
    if (diagnosis.description.trim() == "") {
      diagnosis.description = null;
    }
    const diagnosis_list = [...diagnosis_history, diagnosis];
    // diagnosis_history?.length < 1 ? [{ ...values }] : ;
    console.log({ values, diagnosis_list });

    const docRef: any = doc(db, "users", `${currentUser?.uid}`);

    updateDoc(docRef, { diagnosis_history: diagnosis_list })
      .then(() => {
        setFormUpdateSuccess(true);
      })
      .catch((error) => {
        console.error({ PtDiagnosisForm_submit_error: error });
        setFormUpdateFailed(true);
      })
      .finally(() => {
        setTimeout(() => {
          formik.resetForm();
          setFormUpdateSuccess(false);
          setFormUpdateFailed(false);
        }, 2000);
      });
  };

  const onReset = () => {
    // console.log("Form is reset");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    onReset,
  });

  const handleRemoveDiagnosis = (index: number) => {
    console.log({ index });
    const updated_diagnosis_list = diagnosis_history.filter(
      (el) => el.summary !== diagnosis_history[index].summary
    );
    console.log({ updated_diagnosis_list });
    const confirm = window.confirm("Do you really want to delete the record?");
    console.log({ confirm });
    if (confirm) {
      const docRef: any = doc(db, "users", `${currentUser?.uid}`);
      updateDoc(docRef, { diagnosis_history: updated_diagnosis_list })
        .then(() => {
          alert("Record deleted successfully");
        })
        .catch((error) => {
          alert("Failed to delete the record");
          console.error({ disease_deletion_error: error });
        });
    }
  };

  return (
    <section className='my-4'>
      <FormContainer title='Diagnosis History'>
        {diagnosis_history.length > 0 && (
          <DiagnosisList
            onDeleteDiagnosis={handleRemoveDiagnosis}
            diagnosis_history={diagnosis_history}
          />
        )}
        {formUpdateSuccess && (
          <Alert variant='standard' severity='success' className='mb-4'>
            Diagnosis history added successfully
          </Alert>
        )}
        {formUpdateFailed && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            Failed to add diagnosis history.
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className='row'>
            <div className='col-12'>
              <FormGroup>
                <TextField
                  autoComplete='off'
                  name='summary'
                  label='Diagnosis summary'
                  variant='outlined'
                  type='text'
                  size='small'
                  required
                  value={formik.values?.summary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.summary && formik?.errors?.summary ? true : false}
                  helperText={formik?.errors?.summary as string}
                />
              </FormGroup>
            </div>
            <div className='col-12'>
              <FormGroup>
                <TextField
                  autoComplete='off'
                  name='description'
                  label='Description'
                  variant='outlined'
                  type='text'
                  size='small'
                  value={formik.values?.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.description && formik?.errors?.description ? true : false}
                  helperText={formik?.errors?.description as string}
                />
              </FormGroup>
            </div>
            <div className='col-12'>
              <Button
                className='me-4'
                type='submit'
                variant='contained'
                size='large'
                disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
              >
                Add diagnosis
              </Button>
              <Button
                type='reset'
                size='large'
                color='error'
                disabled={!formik.dirty || formik.isSubmitting}
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </FormContainer>
    </section>
  );
};

export default PtDiagnosisForm;
