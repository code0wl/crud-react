const
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.jsx',

    resolve: {
        extensions: ['', '.js', '.jsx', '.less']
    },

    output: {
        path: './dist',
        filename: 'address-plot-component.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Address plotter',
            filename: 'index.html',
            template: './templates/partials/address-plot-component.html'
        }),

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })

    ],

    module: {

        preLoaders: [
            {
                test: /\.jsx$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ],

        loaders: [
            
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },

            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader'
            },

            {
                test: /\.less$/,
                loader: "style!css!less!autoprefixer-loader?browsers=last 2 versions"
            }
        ]
    }
};