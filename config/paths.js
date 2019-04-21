// paths.js

// Paths will export some path variables that we'll
// use in other Webpack config and server files

const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appAssets: resolveApp("src/assets"), // For images and other assets
  appBuild: resolveApp("dist"), // Prod built files end up here
  appConfig: resolveApp("config"), // App config files
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveApp("src/index.tsx"), // Main entry point
  appSrc: resolveApp("src") // App source
};
