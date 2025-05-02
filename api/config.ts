import path from "node:path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, "public"),
    db: "mongodb://localhost/forum"
}

export default config;