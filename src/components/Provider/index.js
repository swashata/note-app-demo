import React from 'react';

import { notesCtx, noteDispatchCtx, noteLoadingCtx } from '../../utils/note';
import { authCtx } from '../../utils/auth';

export default function Provider({
  auth,
  notes,
  dispatch,
  noteLoading,
  children,
}) {
  return (
    <authCtx.Provider value={auth}>
      <notesCtx.Provider value={notes}>
        <noteDispatchCtx.Provider value={dispatch}>
          <noteLoadingCtx.Provider value={noteLoading}>
            {children}
          </noteLoadingCtx.Provider>
        </noteDispatchCtx.Provider>
      </notesCtx.Provider>
    </authCtx.Provider>
  );
}
