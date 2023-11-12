import {Button, Input, Stack} from '@chakra-ui/react';
import {todosStore} from '../../store/todosStore';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

type Props = {
  sectionId: number;
};

type AddTaskInlineDialogState = {
  name: string;
};

export const AddTaskInlineDialog = (props: Props) => {
  const {t} = useTranslation();
  const {register, handleSubmit, watch, reset} = useForm<AddTaskInlineDialogState>({
    defaultValues: {
      name: '',
    },
  });

  const name = watch('name');

  const onSubmit: SubmitHandler<AddTaskInlineDialogState> = (data) => {
    if (data.name) {
      todosStore.addTask({
        taskName: data.name,
        sectionId: props.sectionId,
      });
      reset({});
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" gap="0.8rem" marginTop="8px">
        <Input placeholder={t('TodosPage.AddTaskInlineDialog.placeholder')} {...register('name')} />
        <Button isDisabled={!name} type="submit">
          {t('TodosPage.AddTaskInlineDialog.addButton')}
        </Button>
      </Stack>
    </form>
  );
};
