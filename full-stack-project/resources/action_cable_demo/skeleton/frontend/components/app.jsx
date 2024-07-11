import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from './navbar';
import RoomsIndex from './rooms_index';
import Room from './room';
import { LoginForm, SignupForm } from './session_form';

const App = props => {
  return (
    <>
      <NavBar {...props} />
      <Switch>
        <Route path='/login' component={LoginForm} />
        <Route path='/signup' component={SignupForm} />
        <Route path='/rooms' render={routeProps => (
          <section className='home'>
            <RoomsIndex {...routeProps} />
            {props.currentUser &&
              <Route path='/rooms/:id' component={Room} />
            }
          </section>
        )} />
        <Redirect to='/rooms' />
      </Switch>
    </>
  );
};

const mapState = ({ currentUserId, users }) => ({
  currentUser: users[currentUserId]
});

export default connect(mapState)(App);