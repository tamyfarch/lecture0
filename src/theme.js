import { extendTheme } from 'native-base';

export const theme = extendTheme({
  fontConfig: {
    montserrat: {
      100: {
        normal: 'Montserrat_100Thin',
        italic: 'Montserrat_100Thin_Italic',
      },
      200: {
        normal: 'Montserrat_200ExtraLight',
        italic: 'Montserrat_200ExtraLight_Italic',
      },
      300: {
        normal: 'Montserrat_300Light',
        italic: 'Montserrat_300Light_Italic',
      },
      400: {
        normal: 'Montserrat_400Regular',
        italic: 'Montserrat_400Regular_Italic',
      },
      500: {
        normal: 'Montserrat_500Medium',
        italic: 'Montserrat_500Medium_Italic',
      },
      600: {
        normal: 'Montserrat_600SemiBold',
        italic: 'Montserrat_600SemiBold_Italic',
      },
      700: {
        normal: 'Montserrat_700Bold',
        italic: 'Montserrat_700Bold_Italic',
      },
      800: {
        normal: 'Montserrat_800ExtraBold',
        italic: 'Montserrat_800ExtraBold_Italic',
      },
    },
    OpenSans: {
      400: {
        normal: 'OpenSans_400Regular',
        italic: 'OpenSans_400Regular_Italic',
      },
      700: {
        normal: 'OpenSans_700Bold',
        italic: 'OpenSans_700Bold_Italic',
      },
    },
  },
  fonts: {
    heading: 'montserrat',
    montserrat: 'montserrat',
    OpenSans: 'OpenSans',
    bold: 'OpenSans',
  },
  colors: {
    primary: {
      501: '#27357C',
    },
    secondary: {
      500: '#AFAFAF',
    },
    secondGray: {
      500: '#939598',
    },
    darkYellow: {
      500: '#CBAD57',
    },
    green: {
      300: '#DCE4D5',
      500: '#3E923D',
    },
    blue: {
      500: '#27357C',
    },
    red: {
      500: '#ad1313',
    },
    orange: {
      500: '#EBE8E1',
    },
    gray: {
      200: '#788695',
      300: '#AFAFAF',
      500: '#F5F5F5',
    },
    blueGray: {
      500: '#617284',
    },
    darkGray: {
      500: '#191a19',
    },
  },

  components: {
    Text: {
      baseStyle: {
        fontFamily: 'OpenSans',
      },

      defaultProps: {
        colorScheme: 'gray',
        fontFamily: 'OpenSans',
      },
    },
    Input: {
      baseStyle: {
        fontFamily: 'OpenSans',
        placeholderTextColor: 'gray.300',
      },
      colors: {
        gray: {
          300: '#AFAFAF',
        },
      },
    },
    Select: {
      baseStyle: {
        fontFamily: 'OpenSans',
      },
    },
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        fontFamily: 'OpenSans',
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'green',
      },
    },
  },
});
