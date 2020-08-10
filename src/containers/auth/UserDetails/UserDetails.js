import React, { useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index.js';
import UserDetailsPage from '../../../components/UserDetails/UserDetails';
import { useHistory } from 'react-router-dom';
import CustomModal from '../../../components/UI/CustomModal/CustomModal';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

const UserDetails = props => {
  const history = useHistory();
  const { onFetchUserDetails, username } = props;
  useEffect(() => {
    onFetchUserDetails(username);
  }, [onFetchUserDetails, username]);

  const handleSubmit = (userDetails) => {
    props.onUserUpdate(userDetails);
  };

  const handleClose = () => {
    props.onUserUpdateSuccess();
    history.replace('/home');
  };

  let userDetails = {};
  if (props.userDetails) {
    
    userDetails = props.userDetails;
  }

  const content = 'Hurray!!! User Profile update successful!!!';

  let userDetailsPage = <UserDetailsPage
    loading={props.loading}
    heading={'Update profile'}
    values={userDetails}
    handleSubmit={handleSubmit}
    isAuthenticated={false}
  ></UserDetailsPage>;

  if (props.updatedUser) {
    userDetailsPage = <CustomModal content={content} open={props.isAuthenticated} handleClose={handleClose} />;
  }

  return (
    <div>
      {userDetailsPage}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    userDetails: state.auth.userDetails,
    username: state.auth.username,
    updatedUser: state.auth.updatedUser
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUserUpdate: userDetails => dispatch(actions.updateUser(userDetails)),
    onFetchUserDetails: username => dispatch(actions.fetchUser(username)),
    onUserUpdateSuccess: () => dispatch(actions.updateUpdatedUserState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserDetails));