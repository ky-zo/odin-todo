#!/bin/bash
npm init -y
npm install --save-dev --save-exact prettier webpack webpack-cli eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier css-loader csv-loader file-loader html-webpack-plugin style-loader webpack-dev-server xml-loader

touch .prettierrc.json .eslintrc.json .gitignore .prettierignore webpack.config.js

mkdir -p src/images dist
touch src/index.html src/styles.css src/index.js

echo "{
  \"semi\": false,
  \"tabWidth\": 4,
  \"singleQuote\": true,
  \"bracketSpacing\": true,
  \"printWidth\": 140,
  \"htmlWhitespaceSensitivity\": \"ignore\"
}" > .prettierrc.json

echo "{
  \"env\": {
    \"browser\": true,
    \"commonjs\": true,
    \"es2021\": true
  },
  \"extends\": [\"airbnb-base\", \"prettier\"],
  \"parserOptions\": {
    \"ecmaVersion\": \"latest\"
  },
  \"rules\": {
    \"no-console\": \"off\"
  }
}" > .eslintrc.json

echo "node_modules/" > .gitignore

echo "# Ignore artifacts:
build
coverage" > .prettierignore

echo "const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /.xml$/i,
                use: ['xml-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        hot: true,
        static: './dist',
        watchFiles: ['./src'],
    },
    optimization: {
        runtimeChunk: 'single',
    },
}" > webpack.config.js

echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script src="index.js" defer></script>
    <title>Document</title>
</head>
<body>
    
</body>
</html>' > src/index.html
