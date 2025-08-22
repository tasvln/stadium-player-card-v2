// @ts-ignore
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      'gateway.ipfs.io',
      'gateway.pinata.cloud',
      'res.cloudinary.com',
      'asset.cloudinary.com',
      'i.imgur.com',
      'ipfs.io',
      'nftstorage.link',
      'cdn.sanity.io',
      'clips-media-assets2.twitch.tv',
      'clips.twitch.tv',
      'media.discordapp.net',
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
