const path = require('path');
const yargs = require('yargs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



const options = yargs.alias('p', 'production').argv;
const isProduction = options.production;

const webpackConfig = {
    entry: {
        main: [path.resolve(__dirname, 'src/index.js')]
    },
    output: {
        path: !isProduction ?
            path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'dist', 'host'),
        publicPath: isProduction ? './' : '/',
        filename: 'vendor.bundle.js',
        crossOriginLoading: "anonymous"
    },
    watch: false,
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }])
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /pixi\.js/,
            use: 'expose-loader?PIXI'
        },
        {
            test: /phaser-split\.js$/,
            use: 'expose-loader?Phaser'
        },
        {
            test: /p2\.js/,
            use: 'expose-loader?p2'
        },
        {
            test: /\.tsx?/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss', '.css', '.sass']
    },
    devServer: {

        historyApiFallback: true,
        quiet: true,

    },
    node: {
        fs: "empty"
    }
};

if (!isProduction) {
    webpackConfig.devtool = 'inline-source-map'
}

module.exports = webpackConfig;