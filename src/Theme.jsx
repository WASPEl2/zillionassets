import { extendTheme, theme as base } from "@chakra-ui/react"

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
        colorScheme: 'emerald', // default is gray
      }
    },
    Input:{
      defaultProps: {
        focusBorderColor: 'emerald.500'
      }
    },
    Select:{
      baseStyle: {
        _focus: {
          borderColor: 'emerald.500'
        }
      }
    },
    Textarea:{
      defaultProps: {
        focusBorderColor: 'emerald.500'
      }
    }
  },
  colors: {
    emerald: {
      50: 'rgb(236 253 245)',
      100: 'rgb(209 250 229)',
      200: 'rgb(167 243 208)',
      300: 'rgb(110 231 183)',
      400: 'rgb(52 211 153)',
      500: 'rgb(16 185 129)',
      600: 'rgb(5 150 105)',
      700: 'rgb(4 120 87)',
      800: 'rgb(6 95 70)',
      900: 'rgb(6 78 59)',
    },
  },
});
