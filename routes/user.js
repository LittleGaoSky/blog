let express = require('express');
let {User} = require('../model');
let router = express.Router();
router.get('/signup',function (req,res) {
    //渲染模板 1.相对模板的路径
    res.render('user/signup',{title: '注册'});
});
router.post('/signup',function (req,res) {
    let user = req.body;
    User.create(user,function (err,doc) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/user/signin');
        }
    })
});
router.get('/signin',function (req,res) {
    res.render('user/signin',{title: '登录'});
});
router.post('/signin',function (req,res) {
    let user = req.body;
    User.findOne(user,function (err,doc) {
        if (err) {
            res.redirect('back');
        } else {
            if (doc) {
                req.session.user = doc;
                res.redirect('/')
            } else {
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