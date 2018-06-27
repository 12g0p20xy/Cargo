const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// 路由
app.get('/hello', (req, res) => {
  res.send('Hello world!')
})

app.get('/user', (req, res) => {
  res.send('User page')
})


/* ========================================= */


// 做一个接口，可返回假数据
const fakeData = { name: 'Jack', age: 18 }

// GET 请求
app.get('/api', (req, res) => {
  console.log('req.query:', req.query)
  // 如果接收到传递的参数则更新 fakeData
  if (req.query.name) {
    fakeData.name = req.query.name
  }
  // 返回 fakeData
  res.send(JSON.stringify(fakeData))
})

// POST 请求
// 处理 post 需要在头部引入 const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/post', (req, res) => {
  console.log('req.body:', req.body)
  if (req.body.name) {
    fakeData.name = req.body.name
  }
  // 返回 fakeData
  res.send(JSON.stringify(fakeData))
})


/* ======================================== */


// 使用 express.static 函数让我们可以引入文件夹 public 里面的静态资源
app.use(express.static('public'))

// 地址栏输入 localhost:3000/，现在可以访问到静态资源了
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


/* ======================================== */


// 控制台运行 node index.js，访问 localhost:3000
app.listen(3000, () => {
  console.log('Done!')
})
