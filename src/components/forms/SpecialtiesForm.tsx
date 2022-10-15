import {
  Alert,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { RiCloseCircleFill } from "react-icons/ri";

import React from "react";
import "./SpecialtiesForm.scss";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../shared/firebase.config";
import { useAuth } from "../../contexts/AuthUser.context";
import { AppUser } from "../../models/user";
import { SPECIALITIES_DROP_DOWN_OPTIONS } from "../../shared/constants";
import FormContainer from "../FormContainer/FormContainer";

const SpecialtiesForm = () => {
  const currentUser: AppUser = useAuth().currentUser;
  const userSpecialities: string[] = currentUser?.specialities || [];
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [specialitiesSelected, setSpecialitiesSelected] = React.useState<string[]>([
    ...userSpecialities,
  ]);
  const [formUpdateSuccess, setFormUpdateSuccess] = React.useState(false);
  const [formUpdateFailed, setFormUpdateFailed] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof specialitiesSelected>) => {
    setIsUpdated(true);
    const {
      target: { value },
    } = event;
    setSpecialitiesSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = () => {
    setFormUpdateSuccess(false);
    setFormUpdateSuccess(false);
    console.log("submitting");
    setIsSubmitting(true);

    const docRef: any = doc(db, "users", `${currentUser?.uid}`);
    updateDoc(docRef, { specialities: specialitiesSelected })
      .then(() => {
        setFormUpdateSuccess(true);
      })
      .catch((error) => {
        console.error({ personal_infor_form_submit_error: error });
        setFormUpdateFailed(true);
      })
      .finally(() => {
        setIsUpdated(false);
        setIsSubmitting(false);

        setTimeout(() => {
          setFormUpdateSuccess(false);
          setFormUpdateSuccess(false);
        }, 5000);
      });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <section>
      <FormContainer title='Specializations'>
        {formUpdateSuccess && (
          <Alert variant='standard' severity='success' className='mb-4'>
            Specializations saved successfully
          </Alert>
        )}
        {formUpdateFailed && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            Failed to update Specializations
          </Alert>
        )}
        {specialitiesSelected.length == 0 && userSpecialities.length == 0 && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            No specializations selected. Please selecet below.
          </Alert>
        )}
        {specialitiesSelected.length > -1 && (
          <div className='row'>
            <div className='col-12 specializations-selected-list mb-4 pb-2'>
              {specialitiesSelected.map((speciality) => (
                <Chip
                  key={speciality}
                  size='medium'
                  style={{
                    padding: "1rem 0.5rem",
                    textTransform: "capitalize",
                    fontSize: "1rem",
                  }}
                  color={userSpecialities.indexOf(speciality) > -1 ? "success" : "secondary"}
                  label={speciality}
                  deleteIcon={<RiCloseCircleFill />}
                />
              ))}
            </div>
          </div>
        )}
        <div className='row'>
          <div className='col-12 col-md-5 col-lg-4'>
            <FormControl fullWidth>
              <InputLabel id='demo-multiple-checkbox-label'>Select Specializations</InputLabel>
              <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                multiple
                value={specialitiesSelected}
                onChange={handleChange}
                input={<OutlinedInput label='Select Specializations' />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {SPECIALITIES_DROP_DOWN_OPTIONS.map((speciality) => (
                  <MenuItem key={speciality} value={speciality}>
                    <Checkbox checked={specialitiesSelected.indexOf(speciality) > -1} />
                    <ListItemText primary={speciality} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='col-12 mt-3'>
            <Button
              variant='contained'
              size='large'
              disabled={!isUpdated || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </FormContainer>
    </section>
  );
};

export default SpecialtiesForm;
