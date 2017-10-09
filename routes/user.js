let crypto = require('crypto');
let express = require('express');
let {User} = require('../model');
let multer = require('multer');// 此中间件仅仅是用来处理上传文件的表单的
// 执行multer方法，并传入配置对象，配置上传后的文件存放的路径
// 代表当前目录，当前目录是server.js所在的目录，也就是启动服务器的文件所在的目录
let upload = multer({dest: './upload'});
let router = express.Router();
router.get('/signup',function (req,res) {
    //渲染模板 1.相对模板的路径
    res.render('user/signup',{title: '注册'});
});
// upload.single用来生成一个中间件函数，负责解析请求体，解析完成后生成两个对象，req.body和req.file
router.post('/signup',upload.single('avatar'),function (req,res) {
    let user = req.body;
    user.avatar = `/${req.file.filename}`;
    User.findOne({username:user.username},function (err, oldUser) {
        if (oldUser) {
            req.flash('error','此用户名已存在，请重新输入！');
            res.redirect('back');
        } else {
            user.password = crypto.createHash('md5').update(user.password).digest('hex');
            User.create(user,function (err,doc) {
                if (err) {
                    req.flash('error',err.toString());
                    res.redirect('back');
                } else {
                    if(result){
                        req.flash('success','用户注册成功，请登录！');
                        res.redirect('/user/signin');
                    }else {
                        req.flash('error','出了一点小故障>_<');
                        res.redirect('back');
                    }
                }
            });
        }
    });
});
router.get('/signin',function (req,res) {
    res.render('user/signin',{title: '登录'});
});
router.post('/signin',function (req,res) {
    let user = req.body;
    user.password = crypto.createHash('md5').update(user.password).digest('hex');
    //查询数据库里有没有跟这个用户用户名和密码相同的用户
    User.findOne(user,function (err,doc) {
        if (err) {
            req.flash('error',err.toString());
            res.redirect('back');
        } else {
            if (doc) {
                req.flash('success','恭喜你，登录成功！');
                req.session.user = doc;
                res.redirect('/')
            } else {
                req.flash('error','用户名或密码错误，请重新输入！');
                res.redirect('back');
            }
        }
    });
});
router.get('/signout',function (req,res) {
    req.flash('success','已退出当前用户')
    req.session.user = null;
    res.redirect('/')
});

module.exports = router;