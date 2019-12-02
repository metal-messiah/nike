import { ActionType } from '../enums/action-type';

export interface IAction {
  type: ActionType;
  payload: any;
}
