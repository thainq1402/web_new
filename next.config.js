module.exports = {
  reactStrictMode: true, // Correctly placed under the Next.js configuration
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
};
