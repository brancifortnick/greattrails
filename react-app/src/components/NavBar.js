
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to='/' exact={true}>
            🥾 Trail Explorer
          </NavLink>
        </div>
        
        <ul className="navbar-menu">
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/trails' exact={true} activeClassName='active'>
              All Trails
            </NavLink>
          </li>
          <li>
            <NavLink to='/states' exact={true} activeClassName='active'>
              Browse States
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to='/my-trails' exact={true} activeClassName='active'>
                My Trails
              </NavLink>
            </li>
          )}
        </ul>

        <div className="navbar-auth">
          {user ? (
            <>
              <span className="navbar-user">Welcome, {user.username}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <li>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
