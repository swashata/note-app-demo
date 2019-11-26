import React from 'react';
import { Link } from 'react-router-dom';

import logoUrl from '../../logo.svg';
import './style.scss';
import { useSession } from '../../utils/auth';

export default function Home() {
  const session = useSession();
  return (
    <section className="section notes-home">
      <div className="notes-home__imgwrap">
        <img src={logoUrl} alt="Notes App" className="notes-home__img" />
      </div>
      <h2 className="notes-home__title title is-2 has-text-black-ter">
        Notes App
      </h2>
      <h3 className="notes-home__subtitle subtitle is-3 has-text-grey">
        Take notes, never forget
      </h3>
      <p className="is-size-5 has-text-grey-light">
        Welcome to your notes. Add new notes, read and edit existing and more.
        Synced live to all your devices.
      </p>
      <div className="notes-home__newnote">
        {session.user ? (
          <Link
            to="/new"
            className="button is-success is-large is-fullwidth is-outlined"
          >
            New Note
          </Link>
        ) : (
          <Link
            to="/signin"
            className="button is-success is-large is-fullwidth is-outlined"
          >
            Signin
          </Link>
        )}
      </div>
    </section>
  );
}
