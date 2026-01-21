import { mergeConfig } from 'vite';
import originalConfig from './original-main';

export default {
  ...originalConfig,
  viteFinal: async (config, { configType, port, host }) => {
    // Call original viteFinal first if it exists
    const customConfig = {
      server: {
        host: '0.0.0.0',
        strictPort: false,
        allowedHosts: true,
        hmr: {
          clientPort: 443,
          host: `${port}-${process.env.E2B_SANDBOX_ID}.e2b.app`,
        }
      }
  };
    let finalConfig = config;
    if (originalConfig.viteFinal) {
      finalConfig = await originalConfig.viteFinal(config, { configType });
    }

    // Merge with custom configuration
    finalConfig = mergeConfig(finalConfig, customConfig);
  
  // BUILD_STATIC is set to true to work around a storybook static build bug we discorered
  // where base is set the static assets doesn't respect the base path 
  // But the URLs do get prefixed correctly during the build so setting base to /storybook
  // To fix this, we do not set the base during static builds
  if (process.env.BUILD_STATIC !== 'true') {
      finalConfig.base = '/storybook';
    }
    return finalConfig;
  },
};
