import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <CircularProgress color='primary' />
    </div>
  );
};

export default LoadingSpinner;
