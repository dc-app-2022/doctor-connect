import React from "react";
import BioForm from "../../components/forms/BioForm";
import DemographicInfoFrom from "../../components/forms/DemographicInfoFrom";
import HCCBioForm from "../../components/forms/HCCBioForm";
import LocationPickerForm from "../../components/forms/LocationPickerForm";
import PersonalInfoForm from "../../components/forms/PersonalInfoForm";
import PtDiagnosisForm from "../../components/forms/PtDiagnosisForm";
import SpecialtiesForm from "../../components/forms/SpecialtiesForm";
import PageTitle from "../../components/PageTitle";
import { useAuth } from "../../contexts/AuthUser.context";
import { AppUser } from "../../models/user";

const AccountPage = () => {
  const currentUser: AppUser = useAuth().currentUser;
  return (
    <>
      <PageTitle title='Account' />
      <div className='container py-4 py-lg-5'>
        {currentUser?.role !== "HCC" && <PersonalInfoForm />}
        {currentUser?.role == "HCP" && <BioForm />}
        {currentUser?.role == "HCC" && <HCCBioForm />}
        <DemographicInfoFrom />
        {currentUser?.role !== "PT" && <LocationPickerForm />}
        {currentUser?.role == "PT" && <PtDiagnosisForm />}
        {currentUser?.role !== "PT" && <SpecialtiesForm />}
      </div>
    </>
  );
};

export default AccountPage;
