import { IState } from '../interfaces/state';
import { IAction } from '../interfaces/action';

import { ActionType } from '../enums/action-type';

const initialState: IState | any = {
  firstName: '',
  lastName: '',
  hobbies: []
};

export default function appReducer(state: IState = initialState, action: IAction) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.UPDATE_FIRST_NAME:
      return { ...state, firstName: payload };
    case ActionType.UPDATE_LAST_NAME:
      return { ...state, lastName: payload };
    case ActionType.ADD_HOBBY:
      return { ...state, hobbies: [...state.hobbies, payload] };
    case ActionType.REMOVE_HOBBY:
      const hobbies = [...state.hobbies];
      hobbies.splice(payload, 1); // remove index item
      return { ...state, hobbies };
    case ActionType.CLEAR_HOBBIES:
      return { ...state, hobbies: [] };
    default:
      return state;
  }
}
