import React from "react";
import { connect } from 'react-redux';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Redirect } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import CircularProgress from "@material-ui/core/CircularProgress";
import * as actions from '../../../store/actions/index.js';
import CustomModal from '../../../components/UI/CustomModal/CustomModal';
import { useHistory } from 'react-router-dom';

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

const SignUp = props => {

  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleSubmit = (userDetails) => {
    alert(JSON.stringify(userDetails));
    props.onSignUp(userDetails);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  let form = <CircularProgress />

  if (!props.loading) {
    form = (<Formik
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
    </Formik>);
  }

  const handleClose = () => {
    history.replace('/');
  };

  let authRedirect = null;

  console.log(JSON.stringify(props));
  console.log('isAuthenticated', props.isAuthenticated);

  const content = 'Registration is Successful with given username and password. Click anywhere to go to homepage';
  if (props.isAuthenticated) {
    console.log('inside authentication');
    // authRedirect = <Redirect to={props.authRedirectPath} />

    authRedirect = <CustomModal content={content} open={props.isAuthenticated} handleClose={handleClose} />;

    // authRedirect = (<React.Fragment><Modal
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="simple-modal-title"
    //   aria-describedby="simple-modal-description"
    // >
    //   Successfully Registered. Login now to access the application.
    // </Modal></React.Fragment>)
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sign Up</h1>
      {authRedirect}
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (userDetails) => dispatch(actions.signUp(userDetails))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);