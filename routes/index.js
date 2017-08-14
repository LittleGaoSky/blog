let express = require('express');
let {Article} = require('../model');
let router = express.Router();
router.get('/',function (req,res) {
    let {pageNum, pageSize, keyword} = req.query;
    pageNum = isNaN(pageNum)?1:parseInt(pageNum);// 当前页码
    pageSize = isNaN(pageSize)?3:parseInt(pageSize);// 每页的条数
    let query={};// 查询关键字，默认为空对象
    if (keyword) {
        query = {title: new RegExp(keyword)};// 正则匹配关键字
    }
    // 计算总页数
    Article.count(query,function (err, count) {
        let totalPages = Math.ceil(count/pageSize);// 向上取整
        // 查询所有文章列表
        Article.find(query)
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
                    totalPages,
                    keyword // 查询过后，查询表单中关键字会丢失故需再传回去。若key非空，则覆盖默认值res.locals.keyword = ''，没有则采用默认值''
                });
            });
    });

});
module.exports = router;