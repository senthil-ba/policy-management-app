import React, { useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index.js';
import UserDetailsPage from '../../../components/UserDetails/UserDetails';
import { useHistory } from 'react-router-dom';

const content = 'Registration is successful with given user details. Opening up the home page!!!';

const UserDetails = props => {
  const history = useHistory();
  const { onFetchUserDetails, username } = props;
  useEffect(()=> {
    onFetchUserDetails(username);
  },[onFetchUserDetails, username]);

  const handleSubmit = (userDetails) => {
    props.onUserUpdate(userDetails);
  };

  const handleClose = () => {
    history.replace('/home');
  };

  let userDetails = {}; 
  if(props.userDetails) {
    console.log('inside if loop***************');
    userDetails = props.userDetails;
  }
  
  return (
    <div>
      <UserDetailsPage
        loading={props.loading}
        heading={'Update profile'}
        values={userDetails}
        handleSubmit={handleSubmit}
        modalContent={content}
        isAuthenticated={false}
        handleClose={handleClose}        
      ></UserDetailsPage>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    userDetails: state.auth.userDetails, 
    username: state.auth.username
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUserUpdate: userDetails => dispatch(actions.updateUser(userDetails)),
    onFetchUserDetails: username => dispatch(actions.fetchUser(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);