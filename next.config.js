/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')();

const nextConfig = {}

module.exports = removeImports({
  ...nextConfig,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});
