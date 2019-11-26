import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

import ButtonFooter from '../ButtonFooter';

export default function NoteForm({
  onSave,
  initialTitle = '',
  initialNote = '',
  cancelLabel = 'Cancel',
  cancelLink = '/',
}) {
  const [titleError, setTitleError] = useState(false);
  const [noteError, setNoteError] = useState(false);

  const handler = e => {
    e.preventDefault();
    const note = e.target['note-note'].value;
    const title = e.target['note-title'].value;

    let hasError = false;
    if (note === '') {
      setNoteError(true);
      hasError = true;
    }
    if (title === '') {
      setTitleError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setNoteError(false);
    setTitleError(false);
    onSave({ title, note });
  };

  return (
    <div className="note-app-form">
      <form onSubmit={handler} data-testid="noteform">
        <div className="field">
          <label htmlFor="note-title" className="label">
            Title
          </label>
          <div className="control">
            <input
              type="text"
              data-testid="note-title"
              id="note-title"
              name="note-title"
              placeholder="Note title"
              className="input is-large"
              defaultValue={initialTitle}
            />
          </div>
          {titleError ? (
            <p className="help is-danger">Please enter a title</p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="note-note" className="label">
            Note
          </label>
          <div className="control">
            <textarea
              name="note-note"
              data-testid="note-note"
              id="note-note"
              rows="10"
              className="textarea is-medium"
              placeholder="Markdown allowed"
              defaultValue={initialNote}
            />
          </div>
          {noteError ? (
            <p className="help is-danger">Please enter a note</p>
          ) : null}
        </div>
        <ButtonFooter>
          <div className="control">
            <button className="button is-primary" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <Link to={cancelLink} className="button is-white">
              {cancelLabel}
            </Link>
          </div>
        </ButtonFooter>
      </form>
    </div>
  );
}
