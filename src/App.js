import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';

import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Error404 from './components/404';
import Spinner from './components/Spinner';
import Provider from './components/Provider';

import Home from './routes/Home';
import New from './routes/New';
import Note from './routes/Note';
import Signin from './routes/Signin';

import { useSetupNotesWithAuth } from './utils/note';
import { useAuth } from './utils/auth';

export default function App({ firebaseAuth, firebaseDb }) {
  const auth = useAuth(firebaseAuth);
  const [notes, dispatch, notesLoading, error] = useSetupNotesWithAuth(
    auth,
    firebaseDb
  );

  useEffect(() => {
    if (error) {
      toast.error(
        error && error.message ? error.message : 'Some error has occured'
      );
    }
  }, [error]);

  // note/noteId1
  // note/noteId2
  // http://localhost:3000/note/c93bb801-dc6a-48fd-b8e2-00f0833eda5a/edit/edit/can

  return (
    <Provider
      auth={auth}
      notes={notes}
      noteLoading={notesLoading}
      dispatch={dispatch}
    >
      <Router>
        <header>
          <Nav firebaseAuth={firebaseAuth} />
        </header>
        <main
          className={classNames('notes-app section', {
            'notes-app--loading': auth.initializing || notesLoading,
          })}
        >
          {auth.initializing || notesLoading ? (
            <Spinner />
          ) : (
            <>
              <Sidebar />
              <div className="notes-app-area">
                <div className="container">
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/new" exact component={New} />
                    <Route
                      path="/signin"
                      exact
                      render={({ history }) => (
                        <Signin firebaseAuth={firebaseAuth} history={history} />
                      )}
                    />
                    <Route path="/note/:noteId" component={Note} />
                    <Route component={Error404} />
                  </Switch>
                </div>
              </div>
            </>
          )}
        </main>
        <ToastContainer />
      </Router>
    </Provider>
  );
}
