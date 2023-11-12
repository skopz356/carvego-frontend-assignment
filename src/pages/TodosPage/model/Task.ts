import {TaskPriority} from './TaskPriority';

export type Task = {
  name: string;
  description?: string;
  id: number;
  priority: TaskPriority;
  createdDate: Date;
  isFinished?: boolean;
};
