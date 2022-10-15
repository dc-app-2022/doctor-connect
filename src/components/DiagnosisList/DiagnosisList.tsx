import React from "react";
import "./DiagnosisList.scss";

import { RiCloseCircleLine } from "react-icons/ri";
import { IconButton, Typography } from "@mui/material";
import { DiagnosisHistory } from "../../models/user";

const DiagnosisList = (props: any) => {
  const handleRemoveDiagnosis = (index: number) => {
    props.onDeleteDiagnosis(index);
  };

  return (
    <div className='diagnosis-list'>
      <Typography variant='subtitle1' className='mb-0'>
        <strong>Diagnosed for:</strong>
      </Typography>
      <ul className='list-group'>
        {props.diagnosis_history.map((el: DiagnosisHistory, index: number) => (
          <li key={index} className='list-item'>
            <div className='summary'>
              <div className='summary-text'>
                <span>Diagnosis:</span> <strong>{el.summary}</strong>
              </div>
              <div className='remove-option'>
                <IconButton
                  color='error'
                  size='medium'
                  aria-label='remove diagnosis'
                  component='label'
                  onClick={() => handleRemoveDiagnosis(index)}
                >
                  <RiCloseCircleLine />
                </IconButton>
              </div>
            </div>
            <div className='description'>
              <span>Description:</span> {el.description || "N/A"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosisList;
