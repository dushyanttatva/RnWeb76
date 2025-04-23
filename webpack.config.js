const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: './index.web.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/react-native'),
          path.resolve(__dirname, 'node_modules/@react-native'),
        ],
        exclude: [
          /node_modules\/(?!(react-native))\//,
          /node_modules\/react-native\/.*\/specs\/components\/.*NativeComponent\.js$/
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:@react-native/babel-preset'],
            plugins: ['@babel/plugin-syntax-import-assertions'], // optional
          },
        },
      }
    ],
  },
  plugins: [new HtmlWebPackPlugin({
      template: './public/index.html'
  })],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-screens': require.resolve('./web-mocks/react-native-screens.js'),
      'react-native-safe-area-context': require.resolve('./web-mocks/react-native-safe-area-context.js'),
    },
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.js'],
  },
};