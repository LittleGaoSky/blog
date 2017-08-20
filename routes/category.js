let express = require('express');
let {Category} = require('../model');
let router = express.Router();

// 查看分类列表
router.get('/list',function (req,res) {
    Category.find({},function (err,categories) {
        res.render('category/list',{title:'分类列表',categories});
    });
});

// 添加分类
router.get('/add',function (req,res) {
    res.render('category/add',{title:'添加分类'})
})
router.post('/add',function (req,res) {
    let category = req.body;
    Category.create(category,function (err,doc) {
        res.redirect('/category/list');
    });
})

// 删除分类
router.get('/delete/:_id',function (req,res) {
    let _id = req.params._id;
    Category.remove({_id},function (err,result) {
        res.redirect('/category/list');
    })
})
module.exports = router;