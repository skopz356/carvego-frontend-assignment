import {Task} from './Task';

export type Section = {
  name: string;
  id: number;
  tasks: Task[];
  tabIndex: number;
};
