module.exports = {
  experimental: {
    turbo: {
      rules: {
        "*.coffee": {
          loaders: ["coffee-loader"],
          as: "*.js",
        },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.redd.it",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.coffee$/,
      use: [
        {
          loader: "coffee-loader",
        },
      ],
    });
    return config;
  },
};
