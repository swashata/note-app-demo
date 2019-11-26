import React from 'react';
import imgUrl from './ghost.svg';

import './style.scss';

export default function Error404({
  title = 'Page Not Found',
  description = 'Sorry the page you are looking for, can not be found. Please try going to the home page.',
}) {
  return (
    <div className="notes-app-404">
      <img src={imgUrl} alt="Error 404" className="notes-app-404__image" />
      <h2 className="title is-2 font-rubik notes-app-404__title">{title}</h2>
      <p className="is-size-5 has-text-grey">{description}</p>
    </div>
  );
}
