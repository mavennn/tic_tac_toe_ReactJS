const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const dev = {
    entry: {
        main: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [

            // JS and JSX files loader
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },

            // CSS files loader
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"]
            },

            // HTML files loader
            {
                test: /\.(html)$/,
                use: {
                    loader: "html-loader"
                }
            }
        ]
    },

    // HTML Webpack Plugin for produce React components to HTML page
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        })
    ]
};

module.exports = [dev];