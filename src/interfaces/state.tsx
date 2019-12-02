import { Hobby } from '../models/hobby';

export interface IState {
  firstName: string;
  lastName: string;
  hobbies: Hobby[];
}
