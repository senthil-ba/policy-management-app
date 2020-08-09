import React from "react";
import { ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";




const FormikField = ({ name, label, type = "text", required = false}) => {
  return (

      <Field
        required={required}
        autoComplete="off"
        as={TextField}
        label={label}
        name={name}
        
        type={type}
        helperText={<ErrorMessage name={name} />}
      />

  );
};

export default FormikField;