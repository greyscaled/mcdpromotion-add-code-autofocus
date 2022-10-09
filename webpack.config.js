const path = require("path")

module.exports = {
    // We only need this for production, since ts-jest can handle the rest
    mode: "production",

    // Application entrypoint
    entry: path.resolve(__dirname, "src", "main.ts"),

    // Don't worry about cache busting or anything, this isn't a serious
    // project
    output: {
        path: path.join(__dirname, "build"),
        filename: "mcdpromotionca-add-code-autofocus.js",
    },

    resolve: {
        extensions: [".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
}
