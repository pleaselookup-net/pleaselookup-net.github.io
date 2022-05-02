const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

module.exports = (env, args) => {
  const config = {
    mode: env.mode,
    entry: {
      'main': path.join(__dirname, 'assets/js/main.js'),
      'main-tmp': path.join(__dirname, 'assets/sass/main.sass'),
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, '_site/assets/dist'),
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
          loader: 'babel-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  indentedSyntax: true,
                  indentWidth: 2,
                  includePaths: [
                    path.join(__dirname, '/src/sass'),
                  ],
                },
              },
            },
          ]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'main.css',
      }),
      new RemoveEmptyScriptsPlugin(),
    ],
  }
  return config
}
