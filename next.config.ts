const withNextIntl = require('next-intl/withNextIntl');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    isrMemoryCacheSize: 0
  }
};

module.exports = withNextIntl(nextConfig);