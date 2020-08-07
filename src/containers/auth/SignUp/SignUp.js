import React from "react";
import { connect } from 'react-redux';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import * as actions from '../../../store/actions/index.js';

import FormikField from "../FormikField/FormikField";
import FormikSelect from "../FormikSelect/FormikSelect";


const initialValues = {
  name: "Senthil",
  username: 'senthil',
  password: 'password',
  email: 'test@test.com',
  contact: '1234567890',
  citizenship: '',
  dateofbirth: '01-01-1990',
  registrationdate: '07-08-2020',
  address: 'Main street',
  state: 'Tamil Nadu',
  country: 'India',
  maritalstatus: "married",
  gender: "male"
};

const genderSelect = [
  {
    label: "Male",
    value: "male"
  },
  {
    label: "Female",
    value: "female"
  },
  {
    label: "Others",
    value: "others"
  }
];

const maritalStatus = [
  {
    label: "Married",
    value: "married"
  },
  {
    label: "Single",
    value: "single"
  },
  {
    label: "Divorced",
    value: "divorced"
  }
];

const emailAddresses = [
  'test@gmail.com',
  'test2@gmail.com',
  'test3@gmail.com'
];

// const lowercaseRegex = /(?=.*[a-z])/;
// const uppercaseRegex = /(?=.*[A-Z])/;
// const numericRegex = /(?=.*[0-9])/;
const alphabetsSpaceRegex = /^[a-zA-Z ]*$/;
const tenDigitNumber = /^\d{10}$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .required("Required"),
  username: Yup.string()
    .matches(alphabetsSpaceRegex, 'Only alphabets and Space allowed')
    .min(2, "Too Short!"),
  password: Yup.string()
    .min(8, 'Minimum 8 characters required!')
    .required('Required!'),
  email: Yup.string()
    .lowercase()
    .email('Must be a valid email!')
    .notOneOf(emailAddresses, 'Email already taken!')
    .required('Required!'),
  contact: Yup.string()
    .matches(tenDigitNumber, '10 digits expected')
    .required('Required!'),
  citizenship: Yup.string().required("Required"),
  dateofbirth: Yup.string().required("Required"),
  registrationdate: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  country: Yup.string().required("Required"),  
  gender: Yup.string().required("Required"),
  maritalstatus: Yup.string().required("Required"),
});

const signUp = props => {
  const handleSubmit = (userDetails) => {
    alert(JSON.stringify(userDetails));
    props.onSignUp(userDetails);
  };

  return (
    <div style={{textAlign : "center"}}>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <div>
                <FormikField name="name" label="Name" required />
                <FormikField name="username" label="User Name" required />
                <FormikField
                  name="password"
                  label="Password"
                  required
                  type="password"
                />
              </div>
              <div>
                <FormikField name="email" label="Email" required />
                <FormikField name="contact" label="Contact Number" required />
                <FormikField name="citizenship" label="Citizenship" required />
              </div>

              <div>
                <FormikField name="dateofbirth" label="Date of Birth" required />
                <FormikField name="registrationdate" label="Registration Date" required />
              </div>

              <div>
                <FormikField name="address" label="Address" required />
              </div>

              <div>
                <FormikField name="state" label="State" required />
                <FormikField name="country" label="Country" required />
              </div>

              <div>

                <FormikSelect
                  name="gender"
                  items={genderSelect}
                  label="Gender"
                  required
                />

                <FormikSelect
                  name="maritalstatus"
                  items={maritalStatus}
                  label="Marital Status"
                  required
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (userDetails) => dispatch(actions.signUp (userDetails))
  };
};

export default connect(null, mapDispatchToProps) (signUp);