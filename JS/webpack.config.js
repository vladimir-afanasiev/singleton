var path = require("path");
var webpack = require("webpack");

module.exports = {

    devtool: 'eval', //replace with source-map for full original source, but compilation times will increase
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000/',
            'webpack/hot/only-dev-server',
            './src/app-dev.jsx'
        ],
        login: [
            'webpack-dev-server/client?http://localhost:3000/',
            'webpack/hot/only-dev-server',
            './src/login-dev.jsx'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: 'http://localhost:3000/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel"],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(png|jp[e]g)$/,
                loader: 'url-loader?limit=100000&name=./assets/images/[name].[ext]?[hash]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test:  /\.(ttf|eot|svg)([\?]?.*)?$/,
                loader: "file-loader"
            }

        ]
    }
};

