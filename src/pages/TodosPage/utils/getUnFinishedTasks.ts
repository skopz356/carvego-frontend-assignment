import {Section} from '../model/Section';
import {Task} from '../model/Task';

export const getUnFinishedTasks = (section: Section): Task[] =>
  section.tasks.filter((task) => !task.isFinished);
