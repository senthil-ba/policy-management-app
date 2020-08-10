import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index.js';
import UserDetails from '../../../components/UserDetails/UserDetails';
import { useHistory } from 'react-router-dom';
import CustomModal from '../../../components/UI/CustomModal/CustomModal';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { Button} from "@material-ui/core";


const initialValues = {
  name: '',
  username: '',
  password: '',
  email: '',
  contact: '',
  citizenship: '',
  dateofbirth: '',
  registrationdate: '',
  address: '',
  state: '',
  country: '',
  maritalstatus: '',
  gender: ''
};

const SignUp = props => {
  const history = useHistory();
  const handleSubmit = (userDetails) => {
    props.onSignUp(userDetails);
  };

  const handleClose = () => {
    history.replace('/');
  };

  console.log(props.customerId);
  const content = `Registration is successful with given user details. Your customer id ${props.customerId}. Opening up the home page!!!`;

  let signUp = <UserDetails
    loading={props.loading}
    heading={'User Registration'}
    values={initialValues}
    handleSubmit={handleSubmit}
    isAuthenticated={props.isAuthenticated}
    {...props}
  ></UserDetails>;
  if (props.isAuthenticated) {
    signUp = <CustomModal content={content} open={props.isAuthenticated} handleClose={handleClose} />;
  } 

  return (
    <div style={{textAlign: 'center'}}>
      {signUp}
      <br />
      {props.isAuthenticated ? null : <Button onClick={handleClose} variant="contained" color="primary">Sign In</Button>}
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    customerId: state.auth.customerId
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (userDetails) => dispatch(actions.signUp(userDetails))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SignUp));