import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'
import { SidebarWallet as OriginalSidebarWallet } from '../stateless/components/Layout/SidebarWallet'


export const SidebarWallet = () => {
    const {
        connect,
        disconnect,
        isEmbeddedKeplrMobileWeb,
        connected,
        connectedWallet,
        status,
    } = useWalletManager()
    
    console.log('hello');
    

    return(
        <div>
            {status === WalletConnectionStatus.Connecting || 
            (connected && connectedWallet) ? (
                <OriginalSidebarWallet
                connectedOrConnecting
                data={
                    connected && connectedWallet ? {
                        loading: false,
                        data: {
                            walletName: connectedWallet.name,
                            walletAddress: connectedWallet.address
                        },
                    }
                    : {
                        loading: true
                    }
                }
                onDisconnect={isEmbeddedKeplrMobileWeb ? undefined : disconnect}
                 />
            ) : (
            <OriginalSidebarWallet 
            connectedOrConnecting={false}
            onConnect={connect}/>
            )}
        </div>
    )

}

