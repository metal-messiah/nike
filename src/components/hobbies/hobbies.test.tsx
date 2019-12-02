import React from 'react';
import ReactDOM from 'react-dom';
import Component from './hobbies';

const f = jest.fn;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Component setSnackBar={f} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
