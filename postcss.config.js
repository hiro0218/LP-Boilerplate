module.exports = (ctx) => {
  return {
    plugins: [
      require('postcss-import')(),
      require('autoprefixer')({
        grid: 'autoplace',
        cascade: false,
      }),
      require('postcss-mixins')(),
      require('postcss-nested')(),
      require('postcss-extend')(),
      require('cssnano')({
        preset: [
          'default',
          {
            autoprefixer: false,
            colormin: true,
            convertValues: false,
            cssDeclarationSorter: true,
            discardComments: { removeAll: true },
            discardDuplicates: true,
            discardEmpty: true,
            discardOverridden: true,
            mergeLonghand: true,
            mergeRules: true,
            minifyFontValues: true,
            minifySelectors: true,
            uniqueSelectors: true,
            svgo: true,
          },
        ],
      }),
      require('postcss-flexbugs-fixes')(),
      require('postcss-sort-media-queries')(),
    ],
  };
};
