import React from 'react';
import './Formerrors.css';
export const FormErrors = ({formErrors}) =>
  <div className="col-md-12 col-lg-12">
    <div className='formErrors'>
      {Object.keys(formErrors).map((fieldName, i) => {
        if(formErrors[fieldName].length > 0){
          let reqFieldName = fieldName.replace('_', ' ');
          return (

            <p key={i}>{reqFieldName} {formErrors[fieldName]}</p>
          )        
        } else {
          return '';
        }
      })}
    </div>
  </div>