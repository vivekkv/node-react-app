const path = require('path');
const compression = require('compression')
const express = require('express');
var cors = require('cors')
const webpack = require('webpack');
const mime = require('mime');
const fs   = require("fs");
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.config.js');
const isDeveloping = process.env.NODE_ENV !== 'production';
var bodyParser = require('body-parser')

const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cors())
app.use(compression());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/assets', express.static(path.join(__dirname, './assets')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (isDeveloping) {

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  
  app.get('/default', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });

  app.get('/admin', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/admin.html')));
    res.end();
  });


} else {

  app.get('/default', function response(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  app.get('/admin', function response(req, res) {
    res.sendFile(path.join(__dirname, '../dist/admin.html'));
  });
  
}

app.use('/category', require('./routes/category'));
app.use('/capacity', require('./routes/capacity'));
app.use('/contact', require('./routes/contact'));
app.use('/features', require('./routes/features'));
app.use('/images', require('./routes/images'));
app.use('/product', require('./routes/product'));
app.use('/productDetail', require('./routes/productDetail'));
app.use('/suitableFor', require('./routes/suitableFor'));
app.use('/videos', require('./routes/videos'));
app.use('/upload', require('./routes/upload'));
app.use('/users', require('./routes/users'));
app.use('/landingPage', require('./routes/landingPage'));
app.use('/attachments', require('./routes/attachments'));

const port = isDeveloping ? 80 : process.env.PORT;
app.listen(port, '0.0.0.0', function onStart(err) {

  if (err) {
    
    console.log(err);
  }
  
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
