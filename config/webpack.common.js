/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/*
 * Webpack Constants
 */
const METADATA = {
    title: 'Smart Home Portal',
    baseUrl: '/',
    assets: "/assets"
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

    /*
     * Static metadata for index.html
     *
     * See: (custom attribute)
     */
    metadata: METADATA,

    /*
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {

        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'

    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['', '.ts', '.js'],

        // Make sure root is src
        root: helpers.root('src'),

        // remove other default values
        modulesDirectories: ['node_modules'],

    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

        /*
         * An array of applied pre and post loaders.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
         */
        preLoaders: [

            /*
             * Tslint loader support for *.ts files
             *
             * See: https://github.com/wbuchwalter/tslint-loader
             */
            // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },

            /*
             * Source map loader support for *.js files
             * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
             *
             * See: https://github.com/webpack/source-map-loader
             */
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    helpers.root('node_modules/rxjs'),
                    helpers.root('node_modules/@angular'),
                ]
            }

        ],

        /*
         * An array of automatically applied loaders.
         *
         * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
         * This means they are not resolved relative to the configuration file.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-loaders
         */
        loaders: [

            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'raw-loader',
                include: [helpers.root("src/app")]
            },
            {
                // Bundle vendor css into a stylesheet
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("raw-loader", "css-loader"),
                include: [helpers.root("src/assets/css")]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('src/index.html')]
            },
            {
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader'],
                exclude: /node_modules/
            }
        ]

    },

    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

        /*
         * Plugin: ForkCheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        new ForkCheckerPlugin(),

        /*
         * Plugin: OccurenceOrderPlugin
         * Description: Varies the distribution of the ids to get the smallest id length
         * for often used ids.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
         * See: https://github.com/webpack/docs/wiki/optimization#minimize
         */
        new webpack.optimize.OccurenceOrderPlugin(true),

        /*
         * Plugin: CommonsChunkPlugin
         * Description: Shares common code between the pages.
         * It identifies common modules and put them into a commons chunk.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
         * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),

        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         *
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }]),

        /*
         * Plugin: HtmlWebpackPlugin
         * Description: Simplifies creation of HTML files to serve your webpack bundles.
         * This is especially useful for webpack bundles that include a hash in the filename
         * which changes every compilation.
         *
         * See: https://github.com/ampedandwired/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        }),

        new ExtractTextPlugin("[name].css")
    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: 'window',
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }

};
