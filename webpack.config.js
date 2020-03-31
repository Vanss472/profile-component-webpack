const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
  CSS: path.resolve(__dirname, 'src/css'),
};

// Webpack configuration
module.exports = {
  devtool: 'inline-source-map',
  entry: [path.join(paths.JS, 'index.js'), path.join(paths.CSS, 'styles.scss')],
  output: {
    path: paths.DIST,
    filename: 'js/app.bundle.js',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false, // remove all comments
        },
      }
    })],
  },
  devServer: {
    open: true
  },
  // webpack is using html plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.hbs'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.bundle.css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(paths.SRC, 'images'),
        to: path.join(paths.DIST, 'images')
      }
    ]),
  ],
  // webpack is using loader
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
            options: {
              partialDirs: [path.join(paths.SRC, 'components')]
            }
          }
        ]
      },
      // babel-loader for .js and .jsx files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer('last 2 versions')]
            }
          },
        ],
      },
    ],
  },
  // enable importing JS files
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
