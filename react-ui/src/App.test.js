import React from 'react';
import ReactDOM from 'react-dom';
import PostBox from './PostBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PostBox />, div);
});
