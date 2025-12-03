import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: [
    // ElevenLabs UI stories are in the registry
    process.env.STORY_PATH || "../apps/www/registry/elevenlabs-ui/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)",
  ],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    // "@storybook/addon-docs",
    // "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: "../apps/www/next.config.mjs",
    },
  },
  core: {
    disableTelemetry: true,
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    }
  },
  typescript: {
    check: false, // Disable type checking during build for faster startup
  },
  webpackFinal: async (config) => {
    // Add TypeScript path alias support
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../apps/www"),
      };
    }

    // Add support for audio files
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: "asset/resource",
    });

    return config;
  },
};

export default config;