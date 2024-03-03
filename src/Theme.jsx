import { extendTheme, theme as base } from "@chakra-ui/react";

const breakpoints = {
  sm: '320px',
  md: '500px',
  lg: '720px',
  xl: '960px',
  '2xl': '1200px',
}

export const theme = extendTheme({
  breakpoints,
  fonts: {
    heading: `'Roboto Slab', ${base.fonts.heading}`,
    body: `'Montserrat', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'white'
      }
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'emerald.700',
      },
      variants: {
        solid: {
          bg: 'emerald.700',
          color: 'white',
          _hover: {
            bg: 'emerald.800',
          },
        },
        outline: {
          border: '1px solid',
          borderColor: 'emerald.700',
          color: 'emerald.700',
          _hover: {
            bg: 'emerald.50',
          },
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'emerald.800'
      }
    },
    Select: {
      baseStyle: {
        _focus: {
          borderColor: 'emerald.900'
        }
      },
      defaultProps: {
        focusBorderColor: 'emerald.900',
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'emerald.950'
      }
    }
  },
  colors: {
    emerald: {
      200: '#b5fddf',
      300: '#7bfac7',
      400: '#3beda7',
      500: '#12d589',
      600: '#08b16f',
      700: '#0a8b59',
      800: '#0e6d49',
      900: '#0e593e',
      950: '#013825',
    },
  },
});
