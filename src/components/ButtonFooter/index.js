import React from 'react';

import './style.scss';

export default function ButtonFooter({ children }) {
  return (
    <div className="field is-grouped note-app-button-footer">{children}</div>
  );
}
