import React from 'react';
import ReactDOM from 'react-dom';
import Component from './header';

const f = jest.fn;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Component setShowForm={f} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
