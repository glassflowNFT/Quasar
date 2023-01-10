import React from 'react'
import { useState, useEffect } from "react";
import {
    useWalletManager,
    useWallet,
    WalletConnectionStatus,
  } from "@noahsaso/cosmodal"
import { Wallet } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Card, CardBody, CardHeader, HStack, Text } from '@chakra-ui/react';
import { LoadingData } from '../../../types/stateless/common';

export interface ConnectedWalletProps {
    data: LoadingData<{
        walletName: string
        walletAddress: string
    }>
    onDisconnect?: () => void
    className?: string
}

export const ConnectedWallet = ({
    data,
    onDisconnect
}: ConnectedWalletProps) => {
    
    console.log(data);
    
    
  return (
    <div>
        <Card background={'gray.500'}>
            <HStack>
                <Wallet style={{ color: 'white' }} />
                <CardHeader>
                    <Text color={'white'}>
                        {data.loading ? '...' : data.data.walletName}
                    </Text>
                </CardHeader>
                <LogoutIcon onClick={onDisconnect} style={{ color: 'white' }}/>
            </HStack>
        </Card>
    </div>
  )
}

export default ConnectedWallet
