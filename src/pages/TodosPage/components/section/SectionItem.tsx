import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, {ReactElement} from 'react';
import {Section} from '../../model/Section';
import {ThreeDotsVerticalIcon} from '../icons/ThreeDotsVerticalIcon';
import {CheckIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import {TaskList} from '../task/TaskList';
import {getUnFinishedTasks} from '../../utils/getUnFinishedTasks';
import {getFinishedTasks} from '../../utils/getFinishedTasks';
import {todosStore} from '../../store/todosStore';
import {useTranslation} from 'react-i18next';

type Props = {
  section: Section;
};

export const SectionItem = (props: Props): ReactElement => {
  const {t} = useTranslation();
  const onMarkAllDone = () => {
    todosStore.markSectionTasksAsDone({
      sectionId: props.section.id,
    });
  };

  const onDeleteSection = () => {
    todosStore.deleteSection({
      sectionId: props.section.id,
    });
  };

  return (
    <Card width="344px" margin="0">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="sm">{props.section.name}</Heading>
            </Box>
          </Flex>
          <Menu>
            <MenuButton as={IconButton} bg="unset" icon={<ThreeDotsVerticalIcon />} />
            <MenuList>
              <MenuItem icon={<CheckIcon />} onClick={onMarkAllDone}>
                {t('TodosPage.SectionItem.actions.markAllDone')}
              </MenuItem>
              <MenuItem icon={<EditIcon />}>{t('TodosPage.SectionItem.actions.edit')}</MenuItem>{' '}
              {/*TODO: edit*/}
              <MenuItem icon={<DeleteIcon />} onClick={onDeleteSection}>
                {t('TodosPage.SectionItem.actions.deleteList')}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Tabs
          variant="unstyled"
          index={props.section.tabIndex}
          onChange={(index: number) =>
            todosStore.setSectionTabIndex({
              tabIndex: index,
              sectionId: props.section.id,
            })
          }
        >
          <TabList>
            {/*TODO: move to global styled*/}
            <Tab
              fontWeight={700}
              _selected={{
                color: 'accent',
              }}
            >
              {t('TodosPage.SectionItem.tabs.all')}
            </Tab>
            <Tab
              fontWeight={700}
              _selected={{
                color: 'accent',
              }}
            >
              {t('TodosPage.SectionItem.tabs.todo')}
            </Tab>
            <Tab
              fontWeight={700}
              _selected={{
                color: 'accent',
              }}
            >
              {t('TodosPage.SectionItem.tabs.done')}
            </Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="accent" borderRadius="1px" width="100%" />

          <TabPanels>
            <TabPanel padding="16px 0 5px 0">
              <TaskList tasks={props.section.tasks} sectionId={props.section.id} />
            </TabPanel>
            <TabPanel padding="16px 0 5px 0">
              <TaskList tasks={getUnFinishedTasks(props.section)} sectionId={props.section.id} />
            </TabPanel>
            <TabPanel padding="16px 0 5px 0">
              <TaskList tasks={getFinishedTasks(props.section)} sectionId={props.section.id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
};
