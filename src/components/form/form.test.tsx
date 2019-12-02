import React from 'react';
import ReactDOM from 'react-dom';
import Component from './form';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from '../../reducers/app-reducer';

const store: any = createStore(appReducer);

const f = jest.fn;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Component open={true} setOpen={f} setSnackBar={f} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
