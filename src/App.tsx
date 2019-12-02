// function and state
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// style
import './App.scss';

// children components
import FormComponent from './components/form/form';
import HobbiesComponent from './components/hobbies/hobbies';
import HeaderComponent from './components/header/header';

// ui
import { Snackbar } from '@material-ui/core';

// interfaces
import { IState } from './interfaces/state';
import { SnackBar } from './interfaces/snackBar';

const App: React.FC = () => {
  // global state
  const { hobbies } = useSelector((state: IState) => state);

  // local state
  const [showForm, setShowForm] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<SnackBar>({ open: false, message: '' });

  return (
    <div className='App'>
      <HeaderComponent setShowForm={setShowForm} />
      {!hobbies.length && <h2 className='info'>Get Started By Adding Some Hobbies</h2>}
      <HobbiesComponent setSnackBar={setSnackBar} />
      <FormComponent open={showForm} setOpen={setShowForm} setSnackBar={setSnackBar} />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`bottom,center`}
        open={snackBar.open}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>{snackBar.message}</span>}
        autoHideDuration={5000}
        onClose={() => setSnackBar({ open: false, message: '' })}
      />
    </div>
  );
};

export default App;
