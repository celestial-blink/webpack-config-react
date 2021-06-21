const path=require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');


module.exports = {
    entry:'./src/index.js',
    devtool:"eval-source-map",
    output: {
        // filename: 'bundle.js',
        // path: path.resolve(__dirname, 'dist'),
        path:path.resolve(__dirname,'build'),
        filename:'js/[name].js',
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
                    loader:'url-loader',
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
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        host:'127.0.0.2',
        compress: true,
        historyApiFallback: true,
        port:97,
        hot:true,
        proxy:{
            '/application':'http://127.0.0.1:80',
            secure:false,
            changeOrigin:true
        }
    }
};