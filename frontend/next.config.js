/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com', 'renga.imgix.net', "lh3.googleusercontent.com", "ipfs.infura.io", "upload.wikimedia.org"],
    loader: 'default',
    optimizeImages: true,
    optimizeImagesInDev: true,
    optimizeImagesInProduction: true,
    optimizeImagesInNodeModules: true,
  }
}

module.exports = nextConfig
