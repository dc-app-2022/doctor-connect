import React from "react";
import "./LocationPickerForm.scss";
import { useAuth } from "../../contexts/AuthUser.context";
import { AppUser } from "../../models/user";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../shared/firebase.config";
import { Alert, Button, Typography } from "@mui/material";
import LocationPicker from "location-picker";
import { GeoLocation } from "../../models/user";
import FormContainer from "../FormContainer/FormContainer";
import { RiThumbUpFill } from "react-icons/ri";

const LocationPickerForm = () => {
  const currentUser: AppUser = useAuth().currentUser;
  const [refreshRequest, setRefreshRequest] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formUpdateSuccess, setFormUpdateSuccess] = React.useState(false);
  const [formUpdateFailed, setFormUpdateFailed] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(false);
  const [_geoloaction, _setGeoLocation] = React.useState<GeoLocation | null>(
    currentUser?.geolocation as any
  );

  const map = document.getElementById("map");

  const LocationPickerOptions: {
    setCurrentPosition?: boolean;
    lat?: number;
    lng?: number;
  } = {
    setCurrentPosition: true, // You can omit this, defaults to true
  };

  if (!_geoloaction) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        LocationPickerOptions.lat = position.coords.latitude as any;
        LocationPickerOptions.lng = position.coords.longitude as any;
        console.log({ LocationPickerOptions });
      });
    } else {
      alert("Location permission is not enabled. Please allow");
    }
  } else {
    LocationPickerOptions.lat = _geoloaction.lat as any;
    LocationPickerOptions.lng = _geoloaction.lng as any;
  }

  const mapOptions = { zoom: 17, zoomControl: true };

  // Initialize LocationPicker plugin
  let locationPicker: LocationPicker;

  const renderLocationPicker = () => {
    locationPicker = null as any;
    setTimeout(() => {
      locationPicker = new LocationPicker("map", LocationPickerOptions, mapOptions as any);
    }, 2500);
    console.log({ locationPicker });
  };

  React.useEffect(() => {
    renderLocationPicker();
  }, [refreshRequest, _geoloaction]);

  const handleLocationSubmit = (): void => {
    setIsSubmitting(true);

    // console.log({ geolocation: locationPicker.getMarkerPosition() });
    try {
      const geolocation = locationPicker.getMarkerPosition();
      const docRef: any = doc(db, "users", `${currentUser?.uid}`);
      updateDoc(docRef, { geolocation: geolocation })
        .then(() => {
          setFormUpdateSuccess(true);
          window.location.reload();
        })
        .catch((error) => {
          console.error({ personal_infor_form_submit_error: error });
          setFormUpdateFailed(true);
        })
        .finally(() => {
          setIsSubmitting(false);
          setRefreshRequest((ref) => ref + 1);
          setTimeout(() => {
            setFormUpdateFailed(false);
            setFormUpdateSuccess(false);
          }, 3000);
        });
    } catch (error) {
      console.error({ error });
      setIsSubmitting(false);
      setFormUpdateFailed(true);
      window.location.reload();
    }
  };

  return (
    <section className='my-4'>
      <FormContainer title='Location selector'>
        <div>
          <Typography className='mb-3'>
            Location selected:{" "}
            {_geoloaction && `lat: ${_geoloaction.lat}, lng: ${_geoloaction.lng}`}
          </Typography>
        </div>

        <Alert variant='standard' severity='info' className='mb-4'>
          We recommend you to always provide exact location of your service to appear in nearby
          search.
        </Alert>
        {formUpdateSuccess && (
          <Alert variant='standard' severity='success' className='mb-4'>
            Location updated successfully
          </Alert>
        )}
        {formUpdateFailed && (
          <Alert variant='standard' severity='warning' className='mb-4'>
            Failed to update. Please try again later.
          </Alert>
        )}
        <div id='map'></div>
        <div>
          <Button
            disabled={isSubmitting}
            variant='contained'
            size='large'
            fullWidth={window.innerWidth < 769}
            type='button'
            onClick={handleLocationSubmit}
          >
            {isSubmitting ? "Updating..." : "Update location"}
          </Button>
        </div>
      </FormContainer>
    </section>
  );
};

export default LocationPickerForm;
