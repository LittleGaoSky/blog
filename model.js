// 1.引入mongoose
let mongoose = require('mongoose');
// 用ES6自带的promise替代mongoose自己废弃的promise库
mongoose.Promise = Promise;
let ObjectId = mongoose.Schema.Types.ObjectId;
// 2.连接数据库
let conn = mongoose.createConnection('mongodb://127.0.0.1:27017/blog');
// 3.定义用户骨架模型
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
});
// 每个集合都有唯一主键_id
// _id的类型就是ObjectId
let ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    createAt: {type: Date, default: Date.now},
    // ref的是当前的外键引用的是哪个集合的主键，把那个集合的模型名称放在此处即可，严格区分大小写
    user: {type: ObjectId, ref: 'User'},
    pv: {type:Number, default: 0},
    category: {type: ObjectId, ref: 'Category'}
});
let CategorySchema = new mongoose.Schema({
    name: String
});
// 4.定义模型并导出模型
exports.User = conn.model('User', UserSchema);
exports.Article = conn.model('Article', ArticleSchema);
exports.Category = conn.model('Category', CategorySchema);