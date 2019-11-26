import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import Spinner from '../../components/Spinner/';
import { useSession } from '../../utils/auth';

export default function Signin({ history, firebaseAuth }) {
  const session = useSession();
  return (
    <div className="notes-app-signin">
      {session.initializing ? (
        <Spinner />
      ) : (
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: 'popup',
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
              signInSuccess() {
                history.push('/');
              },
            },
          }}
          firebaseAuth={firebaseAuth}
        />
      )}
    </div>
  );
}
