module.exports = (ctx) => {
  return {
    plugins: [
      require('postcss-import')(),
      require('autoprefixer')({
        grid: 'autoplace',
        cascade: false,
      }),
      require('postcss-nested')(),
      require('postcss-flexbugs-fixes')(),
      require('postcss-sort-media-queries')(),
    ],
  };
};
