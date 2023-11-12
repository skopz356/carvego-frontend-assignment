import {Button, FormControl, FormLabel, Input, Stack} from '@chakra-ui/react';
import {ReactElement, useState, ChangeEventHandler} from 'react';
import {useTranslation} from 'react-i18next';
import {todosStore} from '../../store/todosStore';
import {AddIcon} from '@chakra-ui/icons';

export const AddSectionInlineDialog = (): ReactElement => {
  const {t} = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [sectionTitle, setSectionTitle] = useState<string>('');

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSectionTitle(e.target.value);

  const onToggleInlineDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const onSaveButtonClick = () => {
    if (sectionTitle) {
      todosStore.addSection({
        title: sectionTitle,
      });
      setSectionTitle('');
      setIsDialogOpen(false);
    }
  };

  return isDialogOpen ? (
    <Stack width="344px">
      <FormControl>
        <FormLabel>{t('TodosPage.AddSectionInlineDialog.sectionTitle')}</FormLabel>
        <Input size="sm" onChange={onInputChange} required />
      </FormControl>
      <Stack direction="row" justifyContent="end">
        <Button bg="neural.30" onClick={onToggleInlineDialog}>
          {t('TodosPage.AddSectionInlineDialog.cancelButton')}
        </Button>
        <Button bg="accent" onClick={onSaveButtonClick}>
          {t('TodosPage.AddSectionInlineDialog.saveButton')}
        </Button>
      </Stack>
    </Stack>
  ) : (
    <Button
      bg="neural.30"
      color="texts.primary"
      onClick={onToggleInlineDialog}
      leftIcon={<AddIcon />}
      width="344px"
    >
      {t('TodosPage.AddSectionInlineDialog.addSection')}
    </Button>
  );
};
