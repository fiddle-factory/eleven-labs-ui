import { mergeConfig } from 'vite';
import originalConfig from './original-main';

const customConfig = {
  server: {
    host: '0.0.0.0',
    strictPort: false,
    hmr: false,
    allowedHosts: true
  }
};

export default {
  ...originalConfig,
  viteFinal: async (config, { configType }) => {
    // Call original viteFinal first if it exists
    let finalConfig = config;
    if (originalConfig.viteFinal) {
      finalConfig = await originalConfig.viteFinal(config, { configType });
    }

    // Merge with custom configuration
    finalConfig = mergeConfig(finalConfig, customConfig);
    finalConfig.base = '/storybook';
    return finalConfig;
  },
};
