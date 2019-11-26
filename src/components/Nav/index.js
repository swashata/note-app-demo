import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../logo.svg';
import './style.scss';
import { useSession } from '../../utils/auth';
import Spinner from '../Spinner';

export default function Nav({ firebaseAuth }) {
  const session = useSession();

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logo} height="28" alt="Notes App" />
            <span className="navbar-logo-text">Notes</span>
          </Link>
        </div>
        <div className="navbar-actions">
          {session.initializing ? (
            <Spinner inline />
          ) : (
            <div className="buttons">
              {session.user ? (
                <>
                  <Link to="/new" className="button is-primary">
                    + New Note
                  </Link>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      firebaseAuth.signOut();
                    }}
                    className="button is-danger"
                    data-testid="logoutbutton"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/signin" className="button is-primary">
                  Sign in
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
