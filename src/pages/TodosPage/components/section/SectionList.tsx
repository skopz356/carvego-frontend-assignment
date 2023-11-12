import React, {ReactElement} from 'react';
import {todosStore} from '../../store/todosStore';
import {SectionItem} from './SectionItem';
import {Stack} from '@chakra-ui/react';
import {AddSectionInlineDialog} from './AddSectionInlineDialog';
import {SectionListPanel} from './SectionListPanel';

export const SectionList = (): ReactElement => {
  const sections = todosStore.useStore((state) => state.sections);

  return (
    <Stack
      bg="neural.20"
      minHeight="calc(100vh - 48px)"
      border="1px"
      borderColor="neural.40"
      paddingTop="28px"
      paddingX="16px"
    >
      <SectionListPanel />
      <Stack
        direction="row"
        borderTop="1px"
        borderColor="neural.40"
        paddingTop="16px"
        flexWrap="wrap"
        gap="16px"
      >
        {sections.map((section) => (
          <SectionItem key={section.id} section={section} />
        ))}
        <AddSectionInlineDialog />
      </Stack>
    </Stack>
  );
};
