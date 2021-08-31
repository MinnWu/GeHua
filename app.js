const express = require("express");
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

const fs = require('fs')
const dataPath = './data.json'

//读取数据
const readData = (path = dataPath) => {
    try {
        return JSON.parse(fs.readFileSync(path, 'utf8'))
    } catch (err) {
        console.error(err)
        return false
    }
}

//写入数据
const writeData = (data, path = dataPath) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

const Result = (obj) => {
    //拿到data.json的数据给obj对象
    // var obj = JSON.parse(fs.readFileSync(path, 'utf8'))
    //用一个数据arr来接收obj对象的所有子对象，每个子对象表示一条记录，相当于obj有多少条记录
    var arr = Object.keys(obj)

    var val = []
    //遍历每条记录，调用calculate函数的规则对其进行判断买还是卖
    for (let index = 0; index < arr.length; index++) {
        if (calculate(obj[arr[index]]) > 10) {
            val.push(arr[index] + ': 买')
        } else {
            val.push(arr[index] + ': 卖')
        }
    }
    return val
}

//计算规则
const calculate = (obj) => {
    return Number(obj.startPrice) + Number(obj.endPrice)
}

app.use('/', express.static('./'));

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

//处理get请求，响应data.json的数据
app.get("/getdata", (req, res) => {
    res.send(readData())
});

//处理post请求，响应200
app.post('/postdata', (req, res) => {
    // console.log(JSON.parse(req.body.data))//这个是前端Post过来的数据
    // writeData(JSON.parse(req.body.data))
    // res.send(JSON.stringify(res.statusCode))
    res.send(Result(JSON.parse(req.body.data)))
})

//创建服务并监听3000端口
app.listen(3000)
console.log('服务已启动...')

