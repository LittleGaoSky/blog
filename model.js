// 1.引入mongoose
let mongoose = require('mongoose');
// 2.连接数据库
let conn = mongoose.createConnection('mongodb://127.0.0.1:27017/blog');
// 3.定义用户骨架模型
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
// 4.定义模型并导出模型
exports.User = conn.model('User',UserSchema);