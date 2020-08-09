import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index.js';
import UserDetails from '../../../components/UserDetails/UserDetails';
import { useHistory } from 'react-router-dom';


const initialValues = {
  name: "Sathya",
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

const content = 'Registration is successful with given user details. Opening up the home page!!!';



const SignUp = props => {
  const history = useHistory();
  const handleSubmit = (userDetails) => {
    props.onSignUp(userDetails);
  };

  const handleClose = () => {
    history.replace('/');
  };

  console.log('inside signup', initialValues);

  return (
    <div>
      <UserDetails
        loading={props.loading}
        heading={'Sign Up'}
        values={initialValues}
        handleSubmit={handleSubmit}
        modalContent={content}
        isAuthenticated={props.isAuthenticated}
        handleClose={handleClose}
        {...props}
      ></UserDetails>
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