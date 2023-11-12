import React, {ReactElement} from 'react';
import {Box} from '@chakra-ui/react';

export const TopPanel = (): ReactElement => (
  <Box
    py="1.2rem"
    px="1.6rem"
    color="neural.900"
    fontWeight="bold"
    fontSize="16px"
    textAlign="left"
    height="48px"
  >
    Tomáš Kubát
  </Box>
);
