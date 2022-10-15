import React, { useEffect, useState } from "react";
import "./FormInput.scss";

interface InputProps {
  onChange: any;
  name: string;
  onBlur?: any;
  label?: string;
  required?: any;
  id?: string;
  hint?: string;
  error?: string;
  value?: string;
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  type?:
    | "date"
    | "datetime-local"
    | "email"
    | "hidden"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}

const FormInput = (props: InputProps) => {
  useEffect(() => {}, []);

  const handleOnBlur = (e: any) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  const handleOnChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return (
    <>
      <div className='form-group'>
        {props.label && (
          <label className='form-label' htmlFor={props.id}>
            {props.label}
            {props.required && <span className='form-required'>*</span>}
          </label>
        )}
        <input
          type={props.type || "text"}
          id={props.id || ""}
          name={props.name || ""}
          className={`form-input ${props.className ? props.className : ""}`}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          value={props.value}
          placeholder={props.placeholder || props.label ? `Please enter ${props.label}` : ""}
        />
        {props.hint && <p className='form-hint'>{props.hint}</p>}
        {props.error && <p className='form-error'>{props.error}</p>}
      </div>
    </>
  );
};

export default FormInput;

// | "button"
// | "checkbox"
// | "color"
// | "file"
// | "image"
// | "radio"
// | "range"
// | "reset"
// | "submit"
