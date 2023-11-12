import {Task} from '../../model/Task';
import {ReactElement} from 'react';
import {TaskItem} from './TaskItem';
import {Stack} from '@chakra-ui/react';
import {AddTaskInlineDialog} from './AddTaskInlineDialog';

type Props = {
  tasks: Task[];
  sectionId: number;
};
export const TaskList = (props: Props): ReactElement => (
  <Stack>
    {props.tasks.map((task) => (
      <TaskItem key={task.id} task={task} sectionId={props.sectionId} />
    ))}
    <AddTaskInlineDialog sectionId={props.sectionId} />
  </Stack>
);
