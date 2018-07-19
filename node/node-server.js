"use strict";

const express = require("express");

let app = express();

let mainRouter = express.Router();
let xtpl = require('xtpl');
app.set('views', './views');
app.set('view engine', 'xtpl');
mainRouter.get("/", (req, res) => {

    res.render('./index.xtpl',{
        title:'Express'
    },function(error,content){
        console.log(content);
        console.log(error);
    });
});
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    db.close();
});
console.log('listen 8888')
app.use("/", mainRouter);

app.listen(8888, ()=>{
    console.log("正在加载...");
});