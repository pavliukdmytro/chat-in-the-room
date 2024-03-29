const { join } = require('path');

module.exports = {
  webpack: {
    alias: {
      '@' : join(__dirname, 'src/components'),
      '@store' : join(__dirname, 'src/store'),
      '@src' : join(__dirname, 'src'),
    },
    // plugins: [
    //   {
    //     options: {
    //       resources: join(__dirname, 'src', 'scss', 'core', 'wanted'),
    //     },
    //   },
    // ],
    // module: {
    //   rules: [
    //     {
    //       test: /\.s[ac]ss$/i,
    //       use: [
    //         "style-loader",
    //         "css-loader",
    //         {
    //           loader: "sass-loader",
    //           options: {
    //             additionalData: '@import "' + join(__dirname, 'src', 'scss', 'core', 'wanted') + '";',
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
  }
}