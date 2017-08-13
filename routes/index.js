let express = require('express');
let {Article} = require('../model');
let router = express.Router();
router.get('/',function (req,res) {
    //查询所有文章列表
    Article.find({}).populate('user').exec(function (err,articles) {
        res.render('index',{title:'首页', articles})
        // if (err) {
        //     req.flash('error', err.toString());
        //     res.redirect('/');
        // }else {
        //     res.render('index',{title:'首页', articles})
        // }
    });
});
module.exports = router;