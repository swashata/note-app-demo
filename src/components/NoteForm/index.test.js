import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NoteForm from '.';

describe('NoteForm Component', () => {
  test('shows form with initial title and note', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NoteForm initialNote="Initial Note" initialTitle="Initial Title" />
      </MemoryRouter>
    );

    const titleInput = getByTestId('note-title');
    expect(titleInput).toBeInTheDocument();
    expect(titleInput.value).toBe('Initial Title');
    const noteInput = getByTestId('note-note');
    expect(noteInput).toBeInTheDocument();
    expect(noteInput.value).toBe('Initial Note');
  });

  test('shows cancel button with label and link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NoteForm
          initialNote="Initial Note"
          initialTitle="Initial Title"
          cancelLink="/cancel"
        />
      </MemoryRouter>
    );

    const cancelAnchor = getByText('Cancel');
    expect(cancelAnchor).toBeInTheDocument();
    expect(cancelAnchor.getAttribute('href')).toBe('/cancel');
  });

  test('shows validation message when submits with empty text', () => {
    const onSave = jest.fn();
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <NoteForm
          onSave={onSave}
          initialNote="Initial Note"
          initialTitle="Initial Title"
          cancelLink="/cancel"
        />
      </MemoryRouter>
    );

    const form = getByTestId('noteform');

    expect(form).toBeInTheDocument();

    act(() => {
      fireEvent.submit(form, {
        target: {
          'note-title': {
            value: '',
          },
          'note-note': {
            value: '',
          },
        },
      });
    });

    expect(onSave).not.toHaveBeenCalled();
    expect(getByText('Please enter a title')).toBeInTheDocument();
    expect(getByText('Please enter a note')).toBeInTheDocument();
  });

  test('calls onSave when form submits', () => {
    const onSave = jest.fn();
    const { getByTestId, queryByText } = render(
      <MemoryRouter>
        <NoteForm
          onSave={onSave}
          initialNote="Initial Note"
          initialTitle="Initial Title"
          cancelLink="/cancel"
        />
      </MemoryRouter>
    );

    const form = getByTestId('noteform');

    expect(form).toBeInTheDocument();

    act(() => {
      fireEvent.submit(form, {
        target: {
          'note-title': {
            value: 'Value of Title',
          },
          'note-note': {
            value: 'Some awesome note',
          },
        },
      });
    });

    expect(queryByText('Please enter a title')).not.toBeInTheDocument();
    expect(queryByText('Please enter a note')).not.toBeInTheDocument();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      title: 'Value of Title',
      note: 'Some awesome note',
    });
  });
});
