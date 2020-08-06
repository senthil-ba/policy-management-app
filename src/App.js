import React from 'react';
import Layout from './hoc/Layout/Layout';
import Login from './containers/auth/Login/Login'
import SignUp from './containers/auth/SignUp/SignUp';
import Dashboard from './containers/Dashboard/Dashboard';
import PolicyList from './components/PolicyList/PolicyList';
import Purchase from './components/Purchase/Purchase'; 

import { Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>

      <Layout signup={true}>
        <Switch>
          <Route path="/purchase" component={Purchase}  />
          <Route path="/policy" component={PolicyList}  />
          <Route path="/signup" component={SignUp}  />
          <Route path="/home" component={Dashboard} />
          <Route path="/" component={Login} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
