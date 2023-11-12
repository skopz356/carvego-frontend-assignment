import {Section} from '../model/Section';

export const getFinishedTasks = (section: Section) =>
  section.tasks.filter((task) => task.isFinished);
