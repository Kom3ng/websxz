/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'ezy-sxz.oss-cn-hangzhou.aliyuncs.com',
          port: '',
          pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'ezy-sxz.oss-cn-hangzhou.aliyuncs.com',
            port: '',
            pathname: '/**',
          },
      ],
    },
  };

export default nextConfig;
