let express = require('express');
let {User} = require('../model');
let router = express.Router();
router.get('/signup',function (req,res) {
    //渲染模板 1.相对模板的路径
    res.render('user/signup',{title: '注册'});
});
router.post('/signup',function (req,res) {
    let user = req.body;
    User.findOne({username:user.username},function (err, oldUser) {
        if (oldUser) {
            req.flash('error','此用户名已存在，请重新输入！');
            res.redirect('back');
        } else {
            User.create(user,function (err,doc) {
                if (err) {
                    req.flash('error',err.toString());
                    res.redirect('back');
                } else {
                    req.flash('success','用户注册成功，请登录！');
                    res.redirect('/user/signin');
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
    req.session.user = null;
    res.redirect('/')
});

module.exports = router;