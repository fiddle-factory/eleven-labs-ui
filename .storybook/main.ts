import type { StorybookConfig } from "@storybook/nextjs";

import { join, dirname, resolve } from "path"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  "stories": [
    "../apps/www/registry/elevenlabs-ui/ui/**/*.mdx",
    "../apps/www/registry/elevenlabs-ui/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-vitest")
  ],
  "framework": {
    "name": getAbsolutePath("@storybook/nextjs"),
    "options": {
      "nextConfigPath": "../apps/www/next.config.mjs"
    }
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": resolve(__dirname, "../apps/www"),
      };
    }
    return config;
  },
};
export default config;