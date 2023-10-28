/* eslint-disable import/no-extraneous-dependencies */
const { merge, mergeWithCustomize, customizeArray, customizeObject } = require('webpack-merge');

/**
 * optimize and minify your CSS.
 */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

/**
 * optimize and minify your Javascript
 */
const TerserPlugin = require('terser-webpack-plugin');


/**
 * extracts CSS into separate files. 
 * It creates a CSS file per JS file which contains CSS. 
 * It supports On-Demand-Loading of CSS and SourceMaps.
 * no duplicates
 * async loading
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.
  use cleanOnceBeforeBuildPatterns to override this behavior.
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const webpackConfiguration = require('../webpack.config');



module.exports = mergeWithCustomize({
  customizeArray: customizeArray({
    'entry.*': 'prepend'
  }),
  customizeObject: customizeObject({
    entry: 'prepend'
  })
})(webpackConfiguration, {

  mode: 'production',

  module: {
    rules: [

      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      }
    
      
    ],
  },


  /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
  devtool: false,

  /* Optimization configuration */
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },

  /* Performance treshold configuration values */
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  /* Additional plugins configuration */
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  }), new CleanWebpackPlugin({
    verbose: true
  }),]

});
  
  
  
