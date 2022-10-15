import React from "react";
import "./FormGroup.scss";

const FormGroup = (props: any) => {
  return <div className={"form-group " + props.className}>{props.children}</div>;
};

export default FormGroup;
