import {Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack} from '@chakra-ui/react';
import enLocale from 'date-fns/locale/en-US';
import {format} from 'date-fns';
import {CheckIcon, DeleteIcon, HamburgerIcon, SettingsIcon} from '@chakra-ui/icons';
import {ThreeLines} from '../icons/ThreeLines';
import React from 'react';
import {todosStore} from '../../store/todosStore';
import {SectionTabIndex} from '../../model/SectionTabIndex';
import {useTranslation} from 'react-i18next';
import {DateConstants} from '../../../../model/DateConstants';

export const SectionListPanel = () => {
  const {t} = useTranslation();

  console.log(format(new Date(), 'EEE dd MMM', {locale: enLocale}));
  return (
    <Stack justifyContent="space-between" direction="row">
      <Stack color="black" direction="row" alignItems="end">
        <Box fontWeight="700" fontSize="16px">
          Today
        </Box>
        <Box fontSize="12px">
          {format(new Date(), DateConstants.DAY_WITH_SHORT_DATE, {locale: enLocale})}
        </Box>
      </Stack>
      <Stack direction="row">
        <Menu>
          <MenuButton as={IconButton} aria-label="actions" bg="neural.30" icon={<ThreeLines />} />
          <MenuList>
            <MenuItem
              icon={<HamburgerIcon />}
              onClick={() =>
                todosStore.showTaskOfSectionTabIndex({
                  tabIndex: SectionTabIndex.ALL,
                })
              }
            >
              {t('TodosPage.SectionListPanel.showAllTasks')}
            </MenuItem>
            <MenuItem
              icon={<CheckIcon />}
              onClick={() =>
                todosStore.showTaskOfSectionTabIndex({
                  tabIndex: SectionTabIndex.DONE,
                })
              }
            >
              {t('TodosPage.SectionListPanel.viewCompletedTasks')}
            </MenuItem>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={() =>
                todosStore.showTaskOfSectionTabIndex({
                  tabIndex: SectionTabIndex.TO_DO,
                })
              }
            >
              {t('TodosPage.SectionListPanel.viewTodoItems')}
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="actions"
            bg="neural.30"
            color="neural.800"
            icon={<SettingsIcon />}
          />
          <MenuList>
            <MenuItem icon={<HamburgerIcon />} onClick={() => todosStore.resetSections()}>
              {t('TodosPage.SectionListPanel.clearAll')}
            </MenuItem>
            <MenuItem icon={<CheckIcon />} onClick={() => todosStore.removeFinishedTasks()}>
              {t('TodosPage.SectionListPanel.clearAllDoneTasks')}
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Stack>
  );
};
