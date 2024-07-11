import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../redux/users';
import Dropdown from './dropdown';
import Mentions from './mentions';

faChevronRight;
faChevronDown;

const NavBar = ({ currentUser, dispatch }) => {
  return (
    <nav className='navbar'>
      <NavLink exact to='/rooms'>Home</NavLink>
      {currentUser
        ? (
          <>
            <Mentions />
            <Dropdown
              className='logout'
              render={({ toggleOpen, isOpen }) => (
                <>
                  <span onClick={toggleOpen}>
                    {currentUser.username}
                    <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} />
                  </span>
                  <div className='dropdown' hidden={!isOpen}>
                    <button
                      className='btn-primary'
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            />
          </>
        ) : (
          <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Signup</NavLink>
          </>
        )
      }
    </nav>
  );
};

export default NavBar;