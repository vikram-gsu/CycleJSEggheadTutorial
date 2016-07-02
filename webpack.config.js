var webpack = require('webpack');
var path = require('path');

module.exports = {
	devTools: 'source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:3001',
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	output: {
		path : path.join(__dirname, 'dist'),
		filename : 'bundle.js',
		publicPath : '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			include: [path.join(__dirname, 'src'),
              path.join(__dirname, 'node_modules', 'rxjs-es')]
		}]
	}
}
