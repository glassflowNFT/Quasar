import React from 'react'
import { GetStaticProps, NextPage } from "next";
import { useSetRecoilState } from "recoil";
import { useWallet } from '@noahsaso/cosmodal';
import { Home } from '../packages/stateless/pages/Home';
import { ConnectWallet } from '../packages/stateless/components/Wallet/ConnectWallet';
import ConnectedWallet from '../packages/stateless/components/Wallet/ConnectedWallet';
import { SidebarWallet } from '../packages/stateful/SidebarWallet';


const HomePage: NextPage = () => {


    // const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  return (
    <>
      <SidebarWallet />
    </>
  )
}

export default HomePage
