import {ReactElement} from 'react';
import {TopPanel} from './components/TopPanel';
import {SectionList} from './components/section/SectionList';
import {TaskEditDialog} from './components/task/TaskEditDialog';

export const TodosPage = (): ReactElement => (
  <>
    <TopPanel />
    <SectionList />
    <TaskEditDialog />
  </>
);
