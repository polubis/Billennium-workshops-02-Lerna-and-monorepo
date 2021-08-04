const Environment = require("../webpack.utils");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config, mode) => {
    // const environment = Environment(mode, {
    //   styles: "../src/styles/",
    //   components: "../src/components/",
    //   models: "../src/models/",
    // });
    // const envConfig = environment.config();

    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   ...envConfig.resolve.alias,
    // };

    // envConfig.module.rules.forEach((rule) => {
    //   config.module.rules.push(rule);
    // });

    return config;
  },
};
