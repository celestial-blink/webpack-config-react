const path=require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');

/**@type {import('webpack').Configuration} */

module.exports = {
    entry:'./src/index.js',
    devtool:"eval-source-map",
    output: {
        path:path.resolve(__dirname,'build'),
        filename:'js/[name].[contenthash].js',
        clean: true,
    },
    module: {
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                }
            },
            {
                test:/\.html$/,
                use:{
                    loader: 'html-loader'
                }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(png|jpg|gif|woff|woff2|eot|ttf|svg)(\?[\=\.a-z0-9]+)?$/,
                use:{
                    loader: "file-loader",
                    options:{
                        name:'[name].[ext]',
                        outputPath: 'assets',
                        publicPath:'assets'
                    }
                }
            }
        ]
    },
    target:"web",
    mode: 'development',
    resolve:{
        extensions:['.js','.jsx'],
        alias:{
            "@components":path.resolve(__dirname,'./src/components/'),
            "@contexts":path.resolve(__dirname,'./src/context/'),
            "@images":path.resolve(__dirname,'./src/images/'),
            "@configutarions":path.resolve(__dirname,'./src/config/')
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'./index.html',
            minify:false,
            inject:'body'
        }),
        new webpack.ProvidePlugin({
            "React":"react"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        runtimeChunk: true,
      },
    devServer:{
        static:{
            directory: path.join(__dirname, 'build'),
        },
        host:'127.0.0.2',
        compress: true,
        historyApiFallback: true,
        port:97,
        hot:true,
        proxy:{
            '/application':'http://127.0.0.1:80',
            secure:false,
            changeOrigin:true
        },
        disableHostCheck: true
    }
};