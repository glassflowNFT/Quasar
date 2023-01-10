import { isMobile } from "@walletconnect/browser-utils";
import { MAINNET } from "../../../utils";
import { 
    Button,
 } from "@chakra-ui/react";
 import {
    useWalletManager,
    useWallet,
    WalletConnectionStatus,
    IWalletManagerContext,
  } from "@noahsaso/cosmodal"


    export interface ConnectWalletProps {
    onConnect: () => void
    className?: string
    }

    export const ConnectWallet = ({ onConnect, ...props}: ConnectWalletProps) => {

    if (isMobile() && !MAINNET) {
        return null
    }
    // async function connectOnClick() {
    //     connect()
    // }

    return(
        <Button {...props} onClick={onConnect}>Connect</Button>
    )
 }

