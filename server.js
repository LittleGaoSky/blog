let express = require('express');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let flash = require('connect-flash');// 这是一个消息中间件
let path = require('path');
let bodyParser = require('body-parser');
let index = require('./routes/index');// 首页的路由中间件
let user = require('./routes/user');// 用户的路由中间件
let article = require('./routes/article');
let category = require('./routes/category');
let app = express();// 执行express方法得到监听函数app

// 使用bodyParser中间件，得到请求体 req.body
app.use(bodyParser.urlencoded({extended: true}));

// 设置模板
app.set('view engine', 'html');
app.set('views',path.resolve('views'));
app.engine('html', require('ejs').__express);

// 参数是静态文件根目录
app.use(express.static('node_modules'));
app.use(express.static('upload'));

// 使用session中间件，在请求对象上增加一个req.session属性
// req.session是当前客户端在服务器对应的会话对象
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'abcd',
    store: new MongoStore({//指定session的存放位置，服务器重启后，session也不会丢失
        url: 'mongodb://127.0.0.1/blog'
    })
}));

//使用此中间件后，req会增加一个属性，写入一个消息req.flash(type,msg), 读取一个消息，并且销毁消息（只能读取一次）req.flash(type)
app.use(flash());

// 此中间件用来给模板的公共变量赋值
app.use(function (req,res,next) {
    // 把session中的user属性取出赋给模板
    res.locals.user = req.session.user;
    // req.flash('success')取出来是一个数组，对象数据类型不能直接在模板里渲染
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    res.locals.keyword = '';// 默认查询关键字为空
    next();
})

// 请求的URL路径以'/'开头
app.use('/',index);
// 请求的URL路径以'/user'开头
app.use('/user',user);
app.use('/article',article);
app.use('/category',category)
app.listen(8080);