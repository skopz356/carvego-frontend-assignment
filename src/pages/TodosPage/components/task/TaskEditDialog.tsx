import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import {todosStore} from '../../store/todosStore';
import {useEffect} from 'react';
import {TaskPriority} from '../../model/TaskPriority';
import {Select} from 'chakra-react-select';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import {DateConstants} from '../../../../model/DateConstants';

type TaskEditDialogState = {
  name: string;
  description: string;
  priority: TaskPriority;
};

export const TaskEditDialog = () => {
  const {t} = useTranslation();
  const taskDialogState = todosStore.useStore((state) => state.taskDialogState);
  const {register, reset, handleSubmit, control} = useForm<TaskEditDialogState>({
    defaultValues: {
      name: taskDialogState.task?.name,
      description: taskDialogState.task?.description,
      priority: taskDialogState.task?.priority,
    },
  });

  const options = [
    {value: TaskPriority.HIGH, label: 'High'},
    {value: TaskPriority.MEDIUM, label: 'Medium'},
    {
      value: TaskPriority.LOW,
      label: 'Low',
    },
    {
      value: TaskPriority.NONE,
      label: 'None',
    },
  ];

  const onDialogClose = () => {
    todosStore.setTaskDialogState({
      state: {
        open: false,
      },
    });
  };

  const onSubmit: SubmitHandler<TaskEditDialogState> = (data) => {
    if (taskDialogState.task && taskDialogState.sectionId) {
      todosStore.editTask({
        taskId: taskDialogState.task?.id,
        updatedTask: {
          name: data.name,
          priority: data.priority,
          description: data.description,
        },
        sectionId: taskDialogState.sectionId,
      });
      onDialogClose();
    }
  };

  useEffect(() => {
    if (taskDialogState.task) {
      reset(taskDialogState.task);
    }
  }, [taskDialogState]);

  return (
    <Modal isOpen={taskDialogState.open} onClose={onDialogClose}>
      <ModalOverlay />
      <ModalContent maxW="580px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader borderBottom="1px" borderColor="neural.30">
            Edit task <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            {taskDialogState.task?.createdDate && (
              <Box color="neural.n100" paddingTop="10px">
                {t('TodosPage.TaskEditDialog.createdBy', {
                  date: format(taskDialogState.task?.createdDate, DateConstants.DATE_YEAR),
                  time: format(taskDialogState.task?.createdDate, DateConstants.TIME),
                })}
              </Box>
            )}
            <FormControl>
              <FormLabel>Task name</FormLabel>
              <Input
                {...register('name', {
                  required: t('TodosPage.TaskEditDialog.taskNameRequired'),
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Task description</FormLabel>
              <Textarea
                {...register('description')}
                placeholder={t('TodosPage.TaskEditDialog.descriptionPlaceholder')}
              />
            </FormControl>
            <Box maxW="50%">
              <FormControl>
                <FormLabel>{t('TodosPage.TaskEditDialog.priority')}</FormLabel>
                <Controller
                  name="priority"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Select
                      value={options.find((option) => option.value === value)}
                      onChange={(newValue) => newValue && onChange(newValue.value)}
                      options={options}
                      useBasicStyles
                      formatOptionLabel={({value, label}) => (
                        <Flex alignItems="center">
                          {value !== TaskPriority.NONE && (
                            <Box
                              bgColor={`priority.${value.toLowerCase()}`}
                              width="16px"
                              height="16px"
                              borderRadius="50%"
                              marginRight="12px"
                            />
                          )}
                          {label}
                        </Flex>
                      )}
                    />
                  )}
                />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} bg="neural.30" onClick={onDialogClose}>
              {t('common.cancelButton')}
            </Button>
            <Button type="submit">{t('common.saveButton')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
