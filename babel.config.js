module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Only include react-native-paper in production
      process.env.NODE_ENV === 'production' && 'react-native-paper/babel',
    ].filter(Boolean),
  };
};