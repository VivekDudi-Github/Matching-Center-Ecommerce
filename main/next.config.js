/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns : [{
      protocol: 'https',
      // hostname: '**'
      hostname: 'demo-programmatic.10web.me',
      pathname: '/wp-content/uploads/2024/12/**'
    }, {
      protocol: 'https',
      hostname: '**'
    }] ,
    // domains: ['localhost']
  }
};

export default nextConfig;
