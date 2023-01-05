import { extendTheme } from "@chakra-ui/react";


export const quasarTheme = extendTheme({
    styles: {
        global: (props:any) => ({
            body: {
                bg: '#000000',
            },
        })
    },

    colors: {
      primary: '#845EC2',
      secondary: '#FF6F91',
      highlight: '#00C9A7',
      warning: '#FFC75F',
      danger: '#C34A36'
    },

    breakpoints: {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em'
   }
}
)