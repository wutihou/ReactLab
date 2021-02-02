var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
	entry: "./src/index.js", //页面入口文件配置
	output: { //入口文件输出配置
		path: path.join(__dirname, "dist"),
		filename: "bundle.js"
	},
	module: { //加载器配置
		rules: [{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: [{
					loader: 'babel-loader'
				}],
			},
			{
				test: /\.(scss)$/,
				exclude: /(node_modules)/,
				use: [{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path]__[local]-[hash:base64:5]'
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},{
				test: /\.(css)$/,
				exclude: /(node_modules)/,
				use: [{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					}
				]
			},
			{
				test: /\.(css|scss)$/,
				include: path.resolve(__dirname, 'node_modules'),
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(less)$/,
				include: path.resolve(__dirname, 'node_modules'),
				loaders: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [require('autoprefixer')]
						}
					},
					'less-loader'],
			},
			{
				test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
				use: [{
				  loader: 'url-loader',
				  options: {
					limit: 8192,
					name: '[name].[ext]?[hash:7]'
				  }
				}]
			  }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@components': path.resolve(__dirname, 'src/components/'),
			'@page': path.resolve(__dirname, 'src/page/'),
			'~': path.resolve(__dirname, 'src/'),
			'antd': '@sdp.nd/fish',
			'fish': '@sdp.nd/fish'
		}
	},
	devServer: {
		contentBase: path.join(__dirname, "static"),
		port: 7000,
		host: 'localhost',
		filename: "bundle.js",
		open: true,
		hot: true,
		inline: true
	},
	plugins: [],
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks:"all",
					test: /[\\/]node_modules[\\/]/,
					name:"vendor",
					minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
					maxInitialRequests: 5,
					minSize: 0,
					priority:100
				},
                commons: {
					name: "commons",
					test:/[\\/]src[\\/]js[\\/]/,
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
	}
};

if (process.env.NODE_ENV === 'production') { // 生产
	config['mode'] = process.env.NODE_ENV;
	config['plugins'].push(new MiniCssExtractPlugin({
		filename: "[name].css"
	}))
} else {
	Object.assign(config, {
		devtool: 'source-map',
		mode: process.env.NODE_ENV || 'development',
		watch: true
	});
	config['plugins'].push(new HtmlWebpackPlugin({
		title: "React实验室",
		template: "static/index.html"
	}));
	config['plugins'].push(new webpack.HotModuleReplacementPlugin());
	config['plugins'].push(new MiniCssExtractPlugin({
		filename: "[name].css"
	}))
}

module.exports = config;