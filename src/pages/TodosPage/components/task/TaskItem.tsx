import React, {ChangeEvent} from 'react';
import {Task} from '../../model/Task';
import {
  Checkbox,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import {ThreeDotsVerticalIcon} from '../icons/ThreeDotsVerticalIcon';
import {DeleteIcon, EditIcon} from '@chakra-ui/icons';
import {todosStore} from '../../store/todosStore';
import {useTranslation} from 'react-i18next';

type Props = {
  task: Task;
  sectionId: number;
};

export const TaskItem = (props: Props) => {
  const {t} = useTranslation();
  const onTaskFinish = (event: ChangeEvent<HTMLInputElement>) => {
    todosStore.editTask({
      sectionId: props.sectionId,
      taskId: props.task.id,
      updatedTask: {isFinished: event.target.checked},
    });
  };
  const onTaskEdit = () => {
    todosStore.setTaskDialogState({
      state: {
        open: true,
        sectionId: props.sectionId,
        task: props.task,
      },
    });
  };
  const onTaskDeletion = () => {
    todosStore.deleteTask({
      taskId: props.task.id,
      sectionId: props.sectionId,
    });
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      border="1px"
      borderColor="neural.40"
      paddingX="8px"
      borderRadius="4px"
      borderLeftColor={`priority.${props.task.priority.toLowerCase()}`}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        height: '100%',
        backgroundColor: `priority.${props.task.priority.toLowerCase()}`,
        width: '2px',
        left: 0,
      }}
    >
      <Checkbox
        isChecked={props.task.isFinished}
        borderColor="accent"
        iconColor="white"
        onChange={onTaskFinish}
      />
      <div>{props.task.name}</div>
      <Spacer />
      <Menu>
        <MenuButton as={IconButton} bg="unset" icon={<ThreeDotsVerticalIcon />} />
        <MenuList>
          <MenuItem icon={<EditIcon />} onClick={onTaskEdit}>
            {t('TodosPage.TaskItem.actions.edit')}
          </MenuItem>
          <MenuItem icon={<DeleteIcon />} onClick={onTaskDeletion}>
            {t('TodosPage.TaskItem.actions.delete')}
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};
