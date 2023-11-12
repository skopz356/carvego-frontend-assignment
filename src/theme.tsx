import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
  config: {initialColorMode: 'light', useSystemColorMode: false},
  colors: {
    'priority.high': '#E32C1E',
    'priority.medium': '#FF9800',
    'priority.low': '#24A148',
    neural: {
      20: '#F4F5F7',
      30: '#EBECF0',
      40: '#DFE1E6',
      200: '#6B778C',
      800: '#172B4D',
      900: '#091E42',
      n100: '#7A869A',
    },
    accent: '#0065FF',

    texts: {
      primary: '#091E42',
    },
  },

  components: {
    Button: {
      baseStyle: () => ({
        bg: 'unset',
        backgroundColor: '#0065FF',
        color: 'white',
        borderRadius: '4px',
        fontWeight: 400,
      }),
    },
    IconButton: {
      baseStyle: () => ({
        bg: 'unset',
      }),
    },
    FormLabel: {
      baseStyle: () => ({
        marginTop: '16px',
        fontSize: '12px',
        color: '#42526E',
      }),
    },
    TabList: {
      baseStyle: () => ({
        tab: {
          fontWeight: 700,
        },
      }),
    },
  },
});

export default theme;
