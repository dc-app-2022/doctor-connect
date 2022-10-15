import React from "react";
import "./UserRoleSelection.scss";
import { UserRole } from "../../models/user";
import individual from ".././../assets/images/individual.svg";
import doctor from ".././../assets/images/doctor.svg";
import hospital from ".././../assets/images/hospital.svg";
import { Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../shared/firebase.config";
import { useAuth } from "../../contexts/AuthUser.context";

const UserRoleSelection = () => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = React.useState<UserRole | undefined>();
  const handleUserSelection = (userRole: UserRole) => {
    console.log({ userRole });
    setDoc(doc(db, "users", currentUser.uid), { role: userRole }, { merge: true })
      .then(() => {
        console.log("User role updated successfully");
      })
      .catch((error) => {
        console.error({ error });
      });
  };
  return (
    <section className='user-role-selection-container vh-100 d-flex justify-content-center align-items-center'>
      <Typography variant='h5'>Choose your account type</Typography>
      <div className='selection-panel'>
        <div className='selection-card card-1'>
          <img src={individual} alt='individual' />
          <div className='card-description'>
            <Typography variant='h6' marginBottom={2} align='center'>
              I am an Individual
            </Typography>
            <Button
              onClick={() => handleUserSelection("PT")}
              variant='contained'
              size={"large"}
              fullWidth
            >
              Continue
            </Button>
          </div>
        </div>
        <div className='selection-card card-2'>
          <img src={doctor} alt='doctor' />
          <div className='card-description'>
            <Typography marginBottom={2} variant='h6' align='center'>
              I am a Health Care Professional (HCP)
            </Typography>
            <Button
              onClick={() => handleUserSelection("HCP")}
              variant='contained'
              size={"large"}
              fullWidth
            >
              Continue
            </Button>
          </div>
        </div>
        <div className='selection-card card-3'>
          <img src={hospital} alt='hospital' />
          <div className='card-description'>
            <Typography variant='h6' marginBottom={2} align='center'>
              We are Health Care Center (HCC)
            </Typography>
            <Button
              onClick={() => handleUserSelection("HCC")}
              variant='contained'
              size={"large"}
              fullWidth
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRoleSelection;
