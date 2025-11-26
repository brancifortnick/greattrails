import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import TrailDetail from './components/Trails/TrailDetail';
import TrailsList from './components/Trails/TrailsList';
import MyTrails from './components/MyTrails/MyTrails';
import TrailsByState from './components/TrailsByState/TrailsByState';
import StateTrailsPage from './components/StateTrailsPage/StateTrailsPage';
import Landing from './components/Landing';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
          < Landing />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/trails/:trailId' exact={true} >
          <TrailDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/trails' exact={true} >
          <TrailsList />
        </ProtectedRoute>
        <ProtectedRoute path='/my-trails' exact={true} >
          <MyTrails />
        </ProtectedRoute>
        <Route path='/states/:stateCode' exact={true} >
          <StateTrailsPage />
        </Route>
        <Route path='/states' exact={true} >
          <TrailsByState />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <Landing />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
