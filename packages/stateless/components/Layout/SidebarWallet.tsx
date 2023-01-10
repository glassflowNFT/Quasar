import React from 'react'
import {
     ConnectWallet,
     ConnectWalletProps,
     ConnectedWallet,
     ConnectedWalletProps
} from '../Wallet'


export type SidebarWalletProps =
| ({
    connectedOrConnecting: true
} & Omit<ConnectedWalletProps, 'className'>
| ({
    connectedOrConnecting: false
}) & Omit<ConnectWalletProps, 'className'>
)

export const SidebarWallet = (props: SidebarWalletProps) => (
    <div>
        {props.connectedOrConnecting ? (
            <ConnectedWallet {...{
                ...props,
                connectedOrConnecting: undefined,
            }} />
        ) : (
            <ConnectWallet {...{
                ...props,
                connectedOrConnecting: undefined
            }} 
          />
        )}
    </div>
)