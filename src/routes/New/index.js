import React from 'react';
import uuid4 from 'uuid/v4';
import { toast } from 'react-toastify';

import NoteForm from '../../components/NoteForm';
import { useDispatch } from '../../utils/note';

export default function New({ history }) {
  const dispatch = useDispatch();

  return (
    <NoteForm
      onSave={values => {
        console.log(values);
        const id = uuid4();
        const action = {
          type: 'add',
          payload: {
            id,
            title: values.title,
            note: values.note,
          },
        };
        dispatch(action);
        history.push(`/note/${id}`);
        toast.success('Note added');
      }}
    />
  );
}
