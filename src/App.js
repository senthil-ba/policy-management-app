import React from 'react';
import Layout from './hoc/Layout/Layout';
import Login from './containers/auth/Login/Login'
import SignUp from './containers/auth/SignUp/SignUp';

import { Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>

      <Layout signup={true}>
        <Switch>
          <Route path="/signup" component={SignUp}  />
          <Route path="/" component={Login} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
