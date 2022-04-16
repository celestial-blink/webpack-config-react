const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
/**@type {import('webpack').Configuration} */

const isProduction = process.env.MODE === 'production';

const styleLoader = ["css-loader","sass-loader"];
styleLoader.unshift(isProduction ? MiniCssExtractPlugin.loader : 'style-loader');

const plugins = [
    new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        minify: false,
        inject: 'body',
        title: isProduction ? 'Production' : 'Development'
    }),
    new webpack.ProvidePlugin({
        "React": "react"
    }),
];
if (isProduction) {
    plugins.unshift(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: 'styles/[name].[contenthash].css' }),
        new BundleAnalyzerPlugin()
    );
} else {
    plugins.unshift(
        new webpack.HotModuleReplacementPlugin()
    );
}

const optimization = { runtimeChunk: true };
if (isProduction) {
    optimization.minimize = true;
    optimization.splitChunks = {
        chunks: 'all',
    },
        optimization.runtimeChunk = {
            name: (entrypoint) => `runtimechunk~${entrypoint.name}`
        };
}

const devServer = {
    static: {
        directory: path.join(__dirname, 'build'),
        watch: true
    },
    compress: true,
    historyApiFallback: true,
    port: 1197,
    hot: true,
    proxy: {
        "/api": {
            target: "http://localhost:80",
            secure: false,
            changeOrigin: true
        }
    }
}

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[contenthash].js',
        clean: true
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js(|x))$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [/node_modules/, /dist/, /build/],

            },
            {
                test: /\.html$/,
                use: 'html-loader',

            },
            {
                test: /\.(s|)css$/,
                use: styleLoader

            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)(\?[\=\.a-z0-9]+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[ext]'
                }
            }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@components": path.resolve(__dirname, './src/components/'),
            "@images": path.resolve(__dirname, './src/images/'),
            "@configutarions": path.resolve(__dirname, './src/config/'),
            "@hooks": path.resolve(__dirname, './src/hooks/'),
            "@contexts": path.resolve(__dirname, './src/contexts/'),
            "@helpers": path.resolve(__dirname, './src/helpers/'),
            "@views": path.resolve(__dirname, './src/views/')
        }
    },
    optimization: optimization,
    ...(isProduction ? {} : { devServer: devServer })
};