import React from 'react';
import {
  render,
  waitForElement,
  fireEvent,
  act,
  cleanup,
} from '@testing-library/react';
import { Route } from 'react-router-dom';

import {
  TestAppProvider,
  getFirebaseAppAndAuth,
  setNotesInApp,
} from '../../utils/testHelpers';

import Note from '.';

describe('Note Route Component', () => {
  describe('when in view mode', () => {
    test('shows view note when in proper location', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      const notes = await setNotesInApp(app, auth);
      const currentNote = notes[0];
      const noteId = currentNote.id;
      const { findByText } = render(
        <TestAppProvider app={app} auth={auth} initialRoute={`/note/${noteId}`}>
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );
      expect(await findByText(currentNote.title)).toBeInTheDocument();
      expect(await findByText(currentNote.note)).toBeInTheDocument();

      expect(await findByText('Edit Note')).toBeInTheDocument();
      expect(await findByText('Delete')).toBeInTheDocument();
    });

    test('shows error component, when not is proper location', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      await setNotesInApp(app, auth);

      const { findByText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/this-id-is-invalid`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      expect(await findByText('Note not found')).toBeInTheDocument();
    });

    test('clicking on the edit button takes to the edit page', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      const notes = await setNotesInApp(app, auth);
      const currentNote = notes[0];
      const noteId = currentNote.id;
      const { findByText, findByLabelText } = render(
        <TestAppProvider app={app} auth={auth} initialRoute={`/note/${noteId}`}>
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      const button = await findByText('Edit Note');
      // expect(button).toBeInTheDocument();

      act(() => {
        fireEvent.click(button);
      });

      expect(await findByLabelText('Title')).toBeInTheDocument();
    });

    test('deletes the note when clicked on the delete button', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      const notes = await setNotesInApp(app, auth);
      const currentNote = notes[0];
      const noteId = currentNote.id;

      const originalConfirm = window.confirm;
      window.confirm = jest.fn(() => true);

      const { findByText, findByLabelText } = render(
        <TestAppProvider app={app} auth={auth} initialRoute={`/note/${noteId}`}>
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      const button = await findByText('Delete');
      expect(button).toBeInTheDocument();

      act(() => {
        fireEvent.click(button);
      });

      expect(window.confirm).toHaveBeenCalledWith(
        'Are you sure you want to delete?'
      );
      expect(await findByText('Note deleted')).toBeInTheDocument();
      cleanup();

      const db = app.firestore();
      const docSnapshot = await db
        .doc(`data/${auth.user.uid}/notes/${noteId}`)
        .get();
      expect(docSnapshot.exists).toBeFalsy();

      window.confirm = originalConfirm;
    });

    test('some other test', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      const notes = await setNotesInApp(app, auth);
      const currentNote = notes[0];
      const noteId = currentNote.id;

      const { findByText, findByLabelText } = render(
        <TestAppProvider app={app} auth={auth} initialRoute={`/note/${noteId}`}>
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      const button = await findByText('Delete');
      expect(button).toBeInTheDocument();
    });
  });
});
