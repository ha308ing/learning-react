const path = require("path")

module.exports = {
  "entry": path.resolve(__dirname, "src/index.js"),
  "mode": "development",
  "devtool": "source-map",
  "output": {
    "path": path.resolve(__dirname, "dist/"),
    "filename": "index.js"
  },
  "module": {
    "rules": [{
      "test": /\.js$/,
      "exclude": path.resolve(__dirname, "node_modules"),
      "loader": "babel-loader",
      "options": {
        "presets": ["@babel/preset-react"]
      }    
    }]
  }
}
