import React from 'react';
import ReactDOM from 'react-dom';
import Component from './form';

const f = jest.fn;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Component open={true} setOpen={f} setSnackBar={f} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
