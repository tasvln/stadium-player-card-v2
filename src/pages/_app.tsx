import { ErrorBoundary } from '@/components/ErrorBoundary'
import TopProgressBar from '@/components/TopProgressBar'
import { globalStyles } from '@/css/global'
import { Web3Provider } from '@/providers'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import DropdownMenu from '@/components/common/DropdownMenu'
import { StrictMode } from 'react'
import { trpc } from '@/utils/trpc'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  // Global styles
  globalStyles()
  DropdownMenu.globalStyles()

  return (
    <Hydrate state={pageProps.dehydratedState}>
      {/* <Web3Provider pageProps={pageProps}> */}
        <TopProgressBar />
        <Component {...pageProps} />
        <Toaster />
      {/* </Web3Provider> */}
    </Hydrate>
  )
}

export default trpc.withTRPC(App)
