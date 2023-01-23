import {
    Check,
    CopyAll,
    HomeOutlined,
    InboxOutlined,
    PushPin,
    PushPinOutlined,
  } from '@mui/icons-material'
import { WalletConnectionStatus, useWallet } from '@xiti/cosmodal'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

/* import { navigatingToHrefAtom } from '@quasar-vote/state'
import {
  CommandModalContextMaker,
  CommandModalContextSection,
  CommandModalDaoInfo,
} from '@quasar-vote/types/command' 
*/
import { CHAIN_ID, getUrlBaseForChainId } from '@quasar-vote/utils'

// import { useMembership, usePinnedDaos } from '../../../hooks' 
