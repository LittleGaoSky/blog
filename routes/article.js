let express = require('express');
let router = express.Router();
let {Article} = require('../model');
router.get('/add',function (req,res) {// add模板修改article时有bug，会导致正常添加article时报错，article未定义，故事先声明
    res.render('article/add',{title: '发表文章', article: {}});
});
router.post('/add',function (req,res) {
    let article = req.body;
    article.user = req.session.user._id;
    Article.create(article,function (err, doc) {
        if (err) {
            req.flash('error',err.toString());
            res.redirect('back');
        } else {
            req.flash('success', '发表文章成功');
            res.redirect('/');
        }
    });
});
router.get('/detail/:_id',function (req,res) {
    let _id = req.params._id;// 先得到路径参数
    Article.findById(_id,function (err, article) {// 根据文章Id查找文章的对象
        res.render('article/detail',{title: '文章详情', article});
    })
});
router.get('/remove/:_id',function (req,res) {
    let _id = req.params._id;
    Article.remove({_id},function (err,result) {
        res.redirect('/');
    });
});
router.get('/edit/:_id',function (req,res) {
    let _id = req.params._id;
    Article.findById(_id, function (err,article) {
        res.render('article/add',{title: '编辑文章', article});
    });
});
router.post('/edit/:_id',function (req,res) {
    let _id = req.params._id;
    Article.update({_id}, req.body, function (err, article) {
        res.redirect(`/article/detail/${_id}`);
    });
});
module.exports=router;
