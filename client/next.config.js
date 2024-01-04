/**
 * @type {import('next').NextConfig}
 */

const withImages = require('next-images');

const dotenv = require('dotenv');
dotenv.config();
const {i18n} = require("./next-i18next.config")
const images = withImages({
  images: {
    loader: 'imgix', // or your preferred image loader
    formats: ['image/webp'],
  },
})
const nextConfig = {
  /*   useFileSystemPublicRoutes: false,
   */  
  images:{
    domains:[
      "res.cloudinary.com",
      "img.icons8.com",
      "swiperjs.com"
    ],
    formats: ['image/webp', 'image/avif', 'image/webp'],
    
   
  },
    reactStrictMode: true,
    i18n,
   
   
    /* async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=3600, s-maxage=3600', // Example: Cache assets for 1 hour, with a CDN cache of 1 day
            },
          ],
        },
      ];
    }, */
  /*    async headers() {
      return [
        {
          source: '/(.*)', // Add the appropriate source path or regex
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';", // Customize your CSP policy here
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
          ],
        },
      ];
    },  */
   
  
  };




  module.exports = nextConfig
