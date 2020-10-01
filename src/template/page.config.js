module.exports = [
  {
    path: {
      dist: 'dist/template/index.html',
      from: 'src/template/index.ejs',
    },
    data: {
      // ejsに注入するデータを定義
      // `htmlWebpackPlugin.options.data` でアクセスする
    },
  },
];
