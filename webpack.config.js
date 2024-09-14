const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';

	return {
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: isProduction ? '[name].[contenthash].js' : '[name].js',
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.js|\.jsx$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
						},
					},
				},
				{
					test: /\.css|\.scss$/,
					use: [
						isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						'sass-loader',
						'postcss-loader',
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
			isProduction && new BundleAnalyzerPlugin(),
			isProduction &&
				new MiniCssExtractPlugin({
					filename: '[name].[contenthash].css',
				}),
			new CleanWebpackPlugin(),
		].filter(Boolean),
		optimization: {
			minimize: isProduction,
			minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
			splitChunks: {
				chunks: 'all',
			},
		},
		devServer: {
			static: {
				directory: path.join(__dirname, 'public'),
			},
			port: 3000,
			hot: true,
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		cache: {
			type: 'filesystem',
		},
		performance: {
			hints: isProduction ? 'warning' : false,
		},
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? 'source-map' : 'eval-source-map',
	};
};
