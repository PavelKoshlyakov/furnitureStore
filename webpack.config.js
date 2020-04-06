const path = require('path');

module.exports = {
    entry: './game/game.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'game', 'dist')
        // path: path.resolve(__dirname)
    },
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    // plugins: [
    //     new CheckerPlugin()
    // ]
};