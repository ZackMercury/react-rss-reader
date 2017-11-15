var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractPlugin = new ExtractTextPlugin({
    filename: "bundle.css"
});

const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: OUTPUT_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app"
    },
    devServer: {
        contentBase: OUTPUT_DIR
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["react", "env", "stage-2"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: ["url-loader"]
            }
        ],
    },

    plugins: [
        extractPlugin
    ]
};