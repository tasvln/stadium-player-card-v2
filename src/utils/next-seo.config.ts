import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  title: 'STADIUM - Permissionless Tournament Protocol',
  defaultTitle: 'STADIUM',
  description:
    'a completely permissionless protocol to enable communities to develop their own self-organized tournaments for the games they love playing together.',
  canonical: 'https://projectstadium.com/',
  openGraph: {
    type: 'website',
    url: 'https://projectstadium.com/',
    title: 'STADIUM - Permissionless Tournament Protocol',
    description:
      'a completely permissionless protocol to enable communities to develop their own self-organized tournaments for the games they love playing together.',
    siteName: 'STADIUM',
    images: [
      {
        url: '/images/logos/stadium-text-wavy.png',
        type: 'image/png',
        alt: 'Og Image',
      },
    ],
  },
  twitter: {
    handle: '@ProjectStadium',
    site: '@ProjectStadium',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      type: 'image/png',
      href: 'images/logos/stadium-seo.png',
    },
    {
      rel: 'preload',
      href: '/fonts/Tungsten-Bold.ttf',
      as: 'font',
      type: 'font/ttf',
      crossOrigin: 'anonymous',
    },
  ],
}

export default config
