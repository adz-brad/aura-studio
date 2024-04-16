/** @type {import('next').NextConfig} */
const nextConfig = { 
    reactStrictMode: false,
    images: {
        remotePatterns: [
          { hostname: 'firebasestorage.googleapis.com' }
        ],
      }, 
}

module.exports = nextConfig
