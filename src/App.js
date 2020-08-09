import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import Login from './containers/auth/Login/Login';
import Logout from './containers/auth/Logout/Logout';
import SignUp from './containers/auth/SignUp/SignUp';
import Dashboard from './containers/Dashboard/Dashboard';
import PolicyList from './containers/PolicyList/PolicyList';
import Purchase from './components/Purchase/Purchase';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const App = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/signup" component={SignUp} />
      <Route path="/" component={Login} />
    </Switch>

  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/purchase" component={Purchase} />
        <Route path="/policy" component={PolicyList} />
        <Route path="/signup" component={SignUp} />
        <Route path="/logout" component={Logout} />
        <Route path="/home" component={Dashboard} />
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout signup={true}>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
