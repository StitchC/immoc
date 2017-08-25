var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function(req,res,next) {
  req.url = '/index.html';
  next();
});

app.use(router);

// 定义工程的全部数据
var appData = require('./data.json');
// 定义商家数据
var seller = appData.seller;
// 定义商品数据
var goods = appData.goods;
// 定义评论数据
var ratings = appData.ratings;

// 模拟后台返回数据接口
var apiRoutes = express.Router();
// 返回商家的数据
apiRoutes.get('/seller',function (req,res) {
  res.json({
    errno: 0,
    data: seller
  });
});

// 返回商品的数据
apiRoutes.get('/goods',function (req,res) {
  res.json({
    errno: 0,
    data: goods
  });
});

// 返回评论数据
apiRoutes.get('/ratings',function (req,res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});
