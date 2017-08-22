let express = require('express');
let {Article} = require('../model');
let router = express.Router();
// 添加评论
router.post('/add',function (req,res) {
    let comment = req.body;
    comment.user = req.session.user._id;
    let {articleId} = req.query;
    Article.update({_id:articleId},{$push:{comments:comment}},function (err,result) {
        res.redirect(`/article/detail/${articleId}`);
    });
});
module.exports = router;