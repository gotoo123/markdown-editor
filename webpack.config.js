const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/demos/index.tsx',
  },
  output: {
    path: path.join(__dirname, '../demos/'),
    filename: 'dev.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/template.html',
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
    compress: true,
    host: '127.0.0.1',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
      },
      {
        test: /\.(css|less)$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
