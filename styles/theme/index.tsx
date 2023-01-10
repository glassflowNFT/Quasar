import { extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/react";
import Button from '../theme/components/button'
// import CardFunction from './components/cardFunction'
// import Card from "./components/card";




export const quasarTheme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                bg: '#000000',
                color: '#FFFFFF'
            },
        })
    },


    components:{
        Button,
        // Card
    },
    
    colors: {
        primary: '#150050',
        secondary: '#3F0071',
        highlight: '#FB2576',
        black: '#000000',
        white: '#FFFFFF',
        warning: '#FFC75F',
        danger: '#C34A36'
    },
    
    breakpoints: {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em'
   },

   shadows: {
        // white: "0 4px 6px -1px rgba(255, 255, 255, 0.8), 0 2px 4px -1px rgba(255, 255, 255, 0.8)"
   }
}
)

