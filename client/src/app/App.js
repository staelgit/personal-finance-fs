import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './layouts/main';
import Operations from './layouts/operations';
import Login from './layouts/login';
import Layout from './components/ui/layout';
import { ToastContainer } from 'react-toastify';
import LogOut from './layouts/logOut';
import ProtectedRoute from './components/common/protectedRoute';
import UserProfile from './layouts/userProfile';
import AppLoader from './components/ui/hoc/appLoader';

function App() {
   return (
      <AppLoader>
         <Layout>
            <Switch>
               <ProtectedRoute path="/app">
                  <Switch>
                     <Route path="/app/operations" component={Operations} />
                     <Route path="/app/user/:userId?" component={UserProfile} />
                     <Redirect to="/" />
                  </Switch>
               </ProtectedRoute>
               <Route path="/login" component={Login} />
               <Route path="/logout" component={LogOut} />
               <Route exact path="/" component={Main} />
               <Redirect to="/" />
            </Switch>
         </Layout>
         <ToastContainer />
      </AppLoader>
   );
}

export default App;
