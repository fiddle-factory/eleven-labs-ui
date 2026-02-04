import path from 'path';
import originalConfig from './original-main';

const getStories = () => {
  const envStories = process.env.STORIES;

  if (envStories) {
    // Split by comma and process each path
    const s = envStories.split(',').map(pattern => {
      let trimmed = pattern.trim();

      // Strip leading ./ or ../ to normalize the path
      trimmed = trimmed.replace(/^\.\.?\//, '');

      // Prepend ../ to make it relative to .storybook directory
      const path = `../${trimmed}`;

      // If it's a specific file (has an extension), convert to a glob pattern
      // that Storybook's indexer can match
      if (path.match(/\.(tsx|ts|jsx|js|mjs)$/)) {
        // Replace the specific extension with a glob pattern
        return path.replace(/\.(tsx|ts|jsx|js|mjs)$/, '.@(js|jsx|mjs|ts|tsx)');
      }

      // If it's already a pattern (contains **), return as is
      return path;
    });
    console.log(`Using STORIES from env: ${JSON.stringify(s)}`);
    return s;
  }

  return undefined;
};

const stories = getStories();

export default {
  ...originalConfig,
  ...(stories ? { stories } : {}),
  fscache: true,

  webpackFinal: async (config, { configType }) => {
    // Call original webpackFinal first if it exists
    let finalConfig = config;
    if (originalConfig.webpackFinal) {
      finalConfig = await originalConfig.webpackFinal(config, { configType });
    }

    // Configure devServer for development mode
    if (configType === 'DEVELOPMENT') {
      finalConfig.devServer = {
        ...finalConfig.devServer,
        client: {
          ...(finalConfig.devServer?.client || {}),
          overlay: false,
        },
      };
    }

    // Enable webpack 5 filesystem caching (absolute path required)
    finalConfig.cache = {
      type: 'filesystem',
      allowCollectingMemory: true,
      compression: "gzip",
    };

    return finalConfig;
  },
};
