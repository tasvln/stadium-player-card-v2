import ConnectWalletButton from "@/components/ConnectWallet";
import { Box, Button, Grid, Image, Link, Text } from "@/components/common";
import { CardsIcon, PCardIcon, StadiumOut } from "@/components/icons";
import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";
// import { usePlayerNameAvailability } from "@/hooks/usePlayerNameAvailability";
import { useModeStore } from "@/store/mode";
import { links } from "@/utils/links";
import config from "@/utils/next-seo.config";
// import { useSession } from "next-auth/react";
// import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { styled } from "stitches.config";

export default function Home() {
  const router = useRouter();
  // const { wallet, signOut } = useAuth();
  // const { data: session } = useSession();

  const { mode, setMode } = useModeStore();

  const onTestMode = () => {
    setMode('test');
    router.push('/player');
  };

  const onMainMode = () => {
    setMode('mint');
    router.push('/player');
  };

  return (
    <Layout header>
      {/* <NextSeo {...config} /> */}
      <Box
        css={{
          width: '80%',
          margin: '0 auto',
          padding: '60px 0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          '@md': {
            width: '100%',
            padding: 0,
            margin: 0,
          },
        }}
      >
        <Box>
          <Box
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,

              width: 300,
              // height: 510,
            }}
          >
            <Image 
              src="/images/mint/playercard-preview.png"
              alt="playercard-preview"
              width={`100%`}
              height={`100%`}
              css={{
                borderRadius: 10,
                pointerEvents: 'none',
              }}
            />
            <Grid
              css={{
                gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                gap: 8,
              }}
            >
              {/* {session ? ( */}
                <Button 
                  variant={"primary"} 
                  css={{ textTransform: 'uppercase' }}
                  onClick={onTestMode}
                >
                  Test Card Editor
                </Button>
              {/* ) : ( */}
                {/* <ConnectWalletButton 
                  size={1}
                  variant="primary"
                  text="Connect Wallet" */}
                {/* /> */}
              {/* )} */}
              {/* <Button 
                variant={"ghost"}
                onClick={onTestMode}
              >
                Test Card Editor
              </Button> */}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}