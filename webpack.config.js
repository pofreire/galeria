const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebPackPlugin = require ('copy-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        contentBase: './build',
        port: 9000,
    },
    optimization: {
        minimizer: [
            new UglifyPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/build'
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.css'}),
        new CopyWebPackPlugin([
            { context: 'src/', from: '**/*.html'},
            { context: 'src/', from: 'imgs/**/*'}
        ])
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use:[
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
        },{
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        },{
            test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
            use: ['file-loader']
        }]
    }
}