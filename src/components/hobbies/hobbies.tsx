// functions and state
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// style
import './hobbies.scss';

// interfaces
import { IState } from '../../interfaces/state';

// enums
import { ActionType } from '../../enums/action-type';

// ui
import { GridList, GridListTile, GridListTileBar, IconButton, Tooltip } from '@material-ui/core';

// helpers
let deleteHobbyClicked = false;
function getSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

const HobbiesComponent: React.FC<{ setSnackBar: Function }> = props => {
  // redux state
  const { firstName, lastName, hobbies } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  // local state
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>(getSize());

  // props
  const { setSnackBar } = props;

  // delete one hobby from list
  const deleteHobby = (index: number) => {
    deleteHobbyClicked = true;
    dispatch({ type: ActionType.REMOVE_HOBBY, payload: index });
    setSnackBar({ open: true, message: `Removed Hobby` });
  };

  // column width for tiles, mix it up to make it more interesting to look at
  const getCols = (index: number) => {
    if (index % 3 === 0 && index % 6 !== 0) {
      return 2;
    }
    return 1;
  };

  useEffect(() => {
    // make sure the latest added one is in view
    if (!deleteHobbyClicked) {
      setTimeout(() => {
        const element = document.getElementById(String(hobbies.length - 1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      deleteHobbyClicked = false;
    }
  }, [hobbies]);

  useEffect(() => {
    // determines whether there should be 3 columns or 1 for grid
    window.addEventListener('resize', () => setWindowSize(getSize()));
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return hobbies.length ? (
    <div className="container">
      <div className="toolbar">
        <div className="user-name">
          {firstName} {lastName}
        </div>
        <Tooltip
          title="Clear All Hobbies"
          placement="bottom"
          onClick={() => dispatch({ type: ActionType.CLEAR_HOBBIES, payload: null })}
        >
          <button id="clear-all" type="button">
            <i className="fas fa-trash" />
          </button>
        </Tooltip>
      </div>
      <GridList cellHeight={300} spacing={1} className="grid-list" cols={windowSize.width > 720 ? 3 : 1}>
        {hobbies.map((hobby, i) => (
          <GridListTile className="tile" key={i} cols={getCols(i)}>
            <div
              className="gif"
              id={String(i)}
              style={{
                backgroundImage: `url(${
                  hobby.image ? hobby.image : 'https://media.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif'
                })`
              }}
            />
            <GridListTileBar
              title={hobby.name}
              actionIcon={
                <Tooltip title="Delete">
                  <IconButton aria-label={`Delete ${hobby.name}`} onClick={() => deleteHobby(i)}>
                    <i className="inset-icon fas fa-trash" />
                  </IconButton>
                </Tooltip>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  ) : (
    <div />
  );
};

export default HobbiesComponent;
