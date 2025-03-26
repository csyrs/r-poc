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
};
