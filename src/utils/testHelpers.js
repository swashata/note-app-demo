import React from 'react';
import * as firebase from '@firebase/testing';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Provider from '../components/Provider';
import { useSetupNotesWithAuth } from './note';

export const testEmail = 'notes-user@example.com';
export const testUid = 'notes-user';
export const projectId = 'firestore-emulator-notes-app';
export const testAuthObj = {
  uid: testUid,
  email: testEmail,
};

export const listOfNotes = [
  {
    id: 'note-id-1',
    title: 'Note Title One',
    note: 'Note Content One',
  },
  {
    id: 'note-id-2',
    title: 'Note Title Two',
    note: 'Note Content Two',
  },
];

export async function setNotesInApp(app, auth, notes = listOfNotes) {
  const db = app.firestore();
  const docRef = db.doc(`data/${auth.user.uid}`);
  const notesRef = db.collection(`data/${auth.user.uid}/notes`);

  await docRef.set({
    initialized: true,
  });

  const operations = [];
  notes.forEach(note => {
    operations.push(
      notesRef.doc(note.id).set({
        title: note.title,
        note: note.note,
      })
    );
  });
  await Promise.all(operations);

  return notes;
}

export function getFirebaseApp(authObj = testAuthObj) {
  return firebase.initializeTestApp({
    projectId,
    auth: authObj,
  });
}

export function getFirebaseAuth(authObj = testAuthObj) {
  return {
    initializing: false,
    user: authObj,
  };
}

export function getFirebaseAppAndAuth(authObj = testAuthObj) {
  return [getFirebaseApp(authObj), getFirebaseAuth(authObj)];
}

export function TestAppProvider({ children, auth, app, initialRoute = '/' }) {
  // we can not call app.auth() right now, because
  // it will throw an error from @firebase/testing
  // hence we can not call useAuth hook in this (unlike App)
  // so we get the output of useAuth directly from props
  // and whenever we test, we use the getFirebaseAuth function
  // to create one `auth` object.
  const [notes, dispatch, noteLoading] = useSetupNotesWithAuth(
    auth,
    app.firestore()
  );
  return (
    <Provider
      auth={auth}
      notes={notes}
      dispatch={dispatch}
      noteLoading={noteLoading}
    >
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
      <ToastContainer />
    </Provider>
  );
}
