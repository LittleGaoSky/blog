let express = require('express');
let {Article} = require('../model');
let router = express.Router();
// 添加评论
router.post('/add',function (req,res) {
    let comment = req.body;
    comment.user = req.session.user._id;
    let {articleId} = req.query;
    Article.update({_id:articleId},{$push:{comments:comment}},function (err,result) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }else {
            if(result){
                req.flash('success','评论成功！');
                res.redirect(`/article/detail/${articleId}`);
            }else {
                req.flash('error','出了一点小故障>_<');
                res.redirect('back');
            }
        }

    });
});
module.exports = router;