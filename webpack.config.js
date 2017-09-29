const path = require("path");
const env = require("./env");

// plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HappyPack = require("happypack");
// eslint-disable-next-line
const webpack = require("webpack");

const ON_PRODUCTION = (process.env.NODE_ENV || env.NODE_ENV) === "production";

const SRC_PATH = "./assets";
const MEDIA_DIR = "media";
const OUTPUT_DIR = "./public";
const PREFIX = ON_PRODUCTION ? ".min" : "";

let entry = {
	[`css/main${PREFIX}.css`]: `${SRC_PATH}/scss/main/main.scss`,
	[`css/vendor${PREFIX}.css`]: `${SRC_PATH}/scss/vendor/vendor.scss`,
	[`js/core${PREFIX}.js`]: `${SRC_PATH}/js/core/core.js`,
	[`js/main${PREFIX}.js`]: `${SRC_PATH}/js/main/main.js`
};

const useMedia = [
	{
		loader: "url-loader",
		options: {
			limit: 4096,
			name: `${MEDIA_DIR}/[hash].[ext]`,
			publicPath: "/"
		}
	}
];

if (ON_PRODUCTION) {
	useMedia.push({
		loader: "image-webpack-loader",
		options: {
			gifsicle: {
				interlaced: false,
			},
			optipng: {
				optimizationLevel: 7,
			},
			pngquant: {
				quality: "65-90",
				speed: 4
			},
			mozjpeg: {
				progressive: true,
				quality: 65
			}
		},
	});
}

module.exports = {
	entry,
	output: {
		filename: "[name]",
		path: path.resolve(__dirname, OUTPUT_DIR)
	},
	stats: {
		assets: true,
		assetsSort: "field",
		cached: false,
		cachedAssets: false,
		children: false,
		chunks: false
	},
	module: {
		rules: [
			{test: /jquery-validation/, loader: "imports-loader?define=>false&this=>window"},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "happypack/loader"
				}
			},
			{
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract(
					[
						"css-loader",
						"postcss-loader",
						"resolve-url-loader",
						"sass-loader?sourceMap",
					]
				)
			}, {
				test: /\.(png|svg|jpg|gif)$/,
				use: useMedia
			}, {
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name]",
			allChunks: true,
		}),
		new WebpackNotifierPlugin({title: "Webpack"}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: require("cssnano"),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		}),
		new HappyPack({
			loaders: ["babel-loader?presets[]=env"]
		})
	],
	cache: true
};

