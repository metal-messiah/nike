// function and state
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// style
import './form.scss';

// models
import { Hobby } from '../../models/hobby';

// interfaces
import { IState } from '../../interfaces/state';
interface Props {
  open: boolean;
  setOpen: Function;
  setSnackBar: Function;
}

// enums
import { ActionType } from '../../enums/action-type';

// ui
import { TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@material-ui/core';
import { isValid, isAlphabetic, isNotEmpty } from '../../util/validator';

// fetch
import axios from 'axios';

const FormComponent: React.FC<Props> = props => {
  // redux state
  const { firstName, lastName } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  // local state
  const [hobby, setHobby] = useState<string>('');
  const [localFirstName, setLocalFirstName] = useState<string>(firstName);
  const [localLastName, setLocalLastName] = useState<string>(lastName);
  const [isDirty, setIsDirty] = useState({ firstName: false, lastName: false, hobby: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [showNameForms, setShowNameForms] = useState<boolean>(firstName && lastName ? false : true);

  // inherited props
  const { open, setOpen, setSnackBar } = props;

  // after submitting hobby, clear certain states
  const resetForm = () => {
    setShowNameForms(localFirstName && localLastName ? false : true);
    setHobby('');
    setIsDirty({ firstName: false, lastName: false, hobby: false });
    setLoading(false);

    focusElement('hobby-input');
  };

  const focusElement = (id: string) => {
    // focus on input
    const hobbyInput = document.getElementById(id);
    if (hobbyInput) {
      hobbyInput.focus();
    }
  };

  // for validation messages, checks if field has been touched
  const updateDirty = (property: keyof { firstName: false; lastName: false; hobby: false }) => {
    const obj = Object.assign({}, isDirty);
    obj[property] = true;
    setIsDirty(obj);
  };

  // disable submit if not all fields are valid
  const formIsValid = () => {
    return (
      isValid(localFirstName, isNotEmpty, isAlphabetic) &&
      isValid(localLastName, isNotEmpty, isAlphabetic) &&
      isValid(hobby, isNotEmpty)
    );
  };

  // bind enter to 'add hobby' button
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && formIsValid()) {
      handleSubmit();
    }
  };

  // after 'add hobby' button is hit
  const handleSubmit = async () => {
    if (formIsValid()) {
      // for loading spinner
      setLoading(true);
      await simulateAPICall();
      // async is done, stop the spinner
      setLoading(false);
    }
  };

  // api call for image for hobby
  const simulateAPICall = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        // giphy api, use hobby keyword as search and grab the first matching image
        const params = { api_key: 'TMWFkdtKTv6To8CjL9OqC2KBNQTM8D3N', q: hobby, limit: 1 };

        // would normally do something like this on the backend
        const gif = await axios.get(`https://api.giphy.com/v1/gifs/search`, { params });

        // grab image url from giphy api response
        const url = gif.data.data.length > 0 ? gif.data.data[0].images.downsized.url : null;

        // build new hobby object from hobby tag and image url
        const h = new Hobby(hobby, url);

        // update redux names and hobby list --> consider refactor to one dispatch method
        dispatch({ type: ActionType.ADD_HOBBY, payload: h });
        dispatch({ type: ActionType.UPDATE_FIRST_NAME, payload: localFirstName });
        dispatch({ type: ActionType.UPDATE_LAST_NAME, payload: localLastName });

        // add a snackbar message of your triumph
        setSnackBar({ open: true, message: `Added '${hobby}' To List` });

        // reset the form to be ready for the next hobby
        resetForm();

        // resolve the async function
        resolve();
      } catch (err) {
        // reject with error
        reject(err);
      }
    });
  };

  return (
    <Dialog open={open} fullWidth={true}>
      <DialogTitle>Add Hobby</DialogTitle>
      <DialogContent>
        <div className="form">
          <div>
            {!showNameForms && (
              <div className="name-display">
                <div>{`${firstName} ${lastName}`}</div>
                <button className="edit-name" type="button" onClick={() => setShowNameForms(true)}>
                  <i className="fas fa-pencil-alt" />
                </button>
              </div>
            )}
            {showNameForms && (
              <FormControl required={true} fullWidth={true}>
                <TextField
                  autoComplete="first name"
                  label="First Name"
                  value={localFirstName}
                  error={isDirty.firstName && !isValid(localFirstName, isNotEmpty, isAlphabetic)}
                  onChange={e => {
                    setLocalFirstName(e.target.value);
                    updateDirty('firstName');
                  }}
                  helperText={isDirty.firstName && !isValid(localFirstName, isNotEmpty, isAlphabetic) ? 'Invalid' : ''}
                  disabled={loading}
                  autoFocus={true}
                />
              </FormControl>
            )}
          </div>
          <div>
            {showNameForms && (
              <FormControl required={true} fullWidth={true}>
                <TextField
                  autoComplete="last name"
                  label="Last Name"
                  value={localLastName}
                  error={isDirty.lastName && !isValid(localLastName, isNotEmpty, isAlphabetic)}
                  onChange={e => {
                    setLocalLastName(e.target.value);
                    updateDirty('lastName');
                  }}
                  helperText={isDirty.lastName && !isValid(localLastName, isNotEmpty, isAlphabetic) ? 'Invalid' : ''}
                  disabled={loading}
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
            )}
          </div>
          <div>
            <FormControl required={true} fullWidth={true}>
              <TextField
                id="hobby-input"
                label="Add a Hobby"
                value={hobby}
                error={isDirty.hobby && !isValid(hobby, isNotEmpty)}
                onChange={e => {
                  setHobby(e.target.value);
                  updateDirty('hobby');
                }}
                helperText={isDirty.hobby && !isValid(hobby, isNotEmpty) ? 'Required' : ''}
                disabled={loading}
                onKeyDown={handleKeyDown}
              />
            </FormControl>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Tooltip title={formIsValid() ? 'Add Hobby To List' : ''}>
          <button
            type="button"
            id="add-button"
            onClick={handleSubmit}
            className={!formIsValid() ? 'disabled' : ''}
            disabled={!formIsValid()}
            onKeyDown={handleKeyDown}
          >
            {!loading && <i className="fas fa-plus-circle" />}
            {loading && <i className="fas fa-spinner fa-spin" />}
          </button>
        </Tooltip>
        <Tooltip title="Close">
          <button id="cancel-button" type="button" onClick={() => setOpen(false)}>
            {!loading && <i className="fas fa-times-circle" />}
          </button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default FormComponent;
