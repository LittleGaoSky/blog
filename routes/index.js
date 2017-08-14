let express = require('express');
let {Article} = require('../model');
let router = express.Router();
router.get('/',function (req,res) {
    let {pageNum, pageSize} = req.query;
    pageNum = isNaN(pageNum)?1:parseInt(pageNum);// 当前页码
    pageSize = isNaN(pageSize)?3:parseInt(pageSize);// 每页的条数
    // 计算总页数
    Article.count({},function (err, count) {
        let totalPages = Math.ceil(count/pageSize);// 向上取整
        // 查询所有文章列表
        Article.find({})
            .sort({createAt: -1})
            .skip((pageNum-1)*pageSize)
            .limit(pageSize)
            .populate('user')
            .exec(function (err,articles) {
                res.render('index',{
                    title:'首页',
                    articles,
                    pageNum,
                    pageSize,
                    totalPages
                });
            });
    });

});
module.exports = router;