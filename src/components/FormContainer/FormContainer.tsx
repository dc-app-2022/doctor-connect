import { Typography } from "@mui/material";
import React from "react";
import "./FormContainer.scss";

const FormContainer = (props: any) => {
  const { title } = props;
  return (
    <div className={"form-container " + props?.className || ""}>
      {title && (
        <div className='form-heading'>
          <Typography variant='h6' className='heading'>
            {title}
          </Typography>
        </div>
      )}
      <div className='form-content'>{props.children}</div>
    </div>
  );
};

export default FormContainer;
