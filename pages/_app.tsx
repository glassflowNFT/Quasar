import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { quasarTheme } from '../styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return( 
  <ChakraProvider theme={quasarTheme}>
    <Component {...pageProps} />
  </ChakraProvider>
  )
}
