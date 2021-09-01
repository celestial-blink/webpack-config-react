const path=require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports ={
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'js/[name].[contenthash].js',
        clean: true
    },
    mode:'production',
    devtool:"source-map",
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                },
                exclude:[/node_modules/,/dist/,/build/],

            },
            {
                test:/\.html$/,
                use:'html-loader',

            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],

            },
            {
                test:/\.(png|jpg|gif|woff|woff2|eot|ttf|svg)(\?[\=\.a-z0-9]+)?$/,
                use:{
                    loader: "file-loader",
                    options:{
                        name:'[name].[ext]',
                        outputPath: '/files/',
                        publicPath:'/application/app/files'
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:"./public/index.html",
            filename:"./index.html",
            minify:true,
            inject:'body'
        }),
        new MiniCssExtractPlugin({
            filename:'styles/[name].[contenthash].css'
        }),
        new webpack.ProvidePlugin({
            "React":"react"
        }),
        new BundleAnalyzerPlugin()
    ],
    resolve:{
        extensions:['.js','.jsx'],
        alias:{
            "@components":path.resolve(__dirname,'./src/components/'),
            "@contexts":path.resolve(__dirname,'./src/context/'),
            "@images":path.resolve(__dirname,'./src/images/'),
            "@configutarions":path.resolve(__dirname,'./src/config/')
        }
    },
    optimization:{
        minimize:true,
        runtimeChunk:{
            name:(entrypoint)=>`runtimechunk~${entrypoint.name}`
        },
        splitChunks:{
            chunks:'all'
        }
    }
};