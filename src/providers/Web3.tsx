import React, { useEffect } from 'react'
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig, SIWEProvider } from "connectkit";
import { mainnet, goerli } from 'wagmi/chains'
import { Zorb } from '@/components/common/Zorb'
import { ENV } from '@/utils/env'
import { vars } from '@/utils/variables';
import SignerProvider from './Signer';
import { SessionProvider } from 'next-auth/react'
import { siweConfig } from '@/utils/siwe';

type Web3Props = {
  children: React.ReactNode;
  pageProps: any
}

const chains = ENV.CHAIN === 1 ? [mainnet] : [goerli]
const appName = "Project Stadium"

const config = createConfig(
  getDefaultConfig({
    alchemyId: ENV.CHAIN === 5 ? ENV.ALCHEMY_GOERLI_KEY : ENV.ALCHEMY_KEY,
    walletConnectProjectId: ENV.WALLETCONNECT_ID,
    chains: chains,
    appName: appName,
    appUrl: "https://mint.projectstadium.com",
    // appLogo: "https://projectstadium.com/images/stadium-seo.png",
  }),
);

const Web3Provider = ({ children, pageProps }: Web3Props) => {
  return (
    <WagmiConfig config={config}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <SIWEProvider {...siweConfig}>
          <ConnectKitProvider
            options={{
              customAvatar: Zorb,
            }}
            customTheme={{
              '--ck-accent-color': '#AFF4C6',
              '--ck-accent-text-color': '#000',
            }}
          >
            <SignerProvider>{children}</SignerProvider>
          </ConnectKitProvider>
        </SIWEProvider>
      </SessionProvider>
    </WagmiConfig>
  )
};

export default Web3Provider;