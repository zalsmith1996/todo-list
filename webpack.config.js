const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/modules/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        client: {
            overlay: {
                warnings: true,
                errors: true,
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo App',
            template: './src/index.html',
            inject: 'head',
            scriptLoading: 'defer',
        }),
        new CopyPlugin({
            patterns: [{ from: './src/assets', to: './assets', force: true }],
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
    },
};