import React from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import { useAuth } from "../../contexts/AuthUser.context";
import { AppUser } from "../../models/user";
import "./Dashboard.scss";

const Dashboard = () => {
  const currentUser: AppUser = useAuth().currentUser;
  return (
    <section className='dashboard-section'>
      <div className='container pb-5 search-from'>
        {currentUser?.role == "PT" && <FormContainer>Hello</FormContainer>}
      </div>
    </section>
  );
};

export default Dashboard;
