import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { quasarTheme } from '../styles/theme'
import {
  WalletManagerProvider,
  ChainInfoID,
  WalletType,
} from '@noahsaso/cosmodal'

export default function App({ Component, pageProps }: AppProps) {
  const LOCAL_STORAGE_KEY = "connectedWalletId"

  return( 
  <ChakraProvider theme={quasarTheme}>
    <WalletManagerProvider
    defaultChainId={ChainInfoID.Juno1}
    enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
    walletConnectClientMeta={{
      name: "CosmodalExampleDAPP",
      description: "A dapp using the cosmodal library.",
      url: "https://cosmodal.example.app",
      icons: ["https://cosmodal.example.app/walletconnect.png"],
    }}
    localStorageKey={LOCAL_STORAGE_KEY}>
       <Component {...pageProps} />
   </WalletManagerProvider>
  </ChakraProvider>
  )
}
