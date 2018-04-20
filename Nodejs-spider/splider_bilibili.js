const http = require('https')
const fs = require('fs')
const request = require('request')

let page = 1,
    biliURL = 'https://bangumi.bilibili.com/web_api/season/index_global?page=1&page_size=20&version=0&is_finish=0&start_year=0&tag_id=&index_type=1&index_sort=0&quarter=0'

// 发出 get 请求，获取页面数据
const startRequest = (url) =>{
  http.get(url, (res) => {
    let htmlData = ''

    res.on('data', (chunk) => {
      htmlData += chunk
    })

    res.on('end', () => {
      // 获取到了完整的 json 数据
      let json = JSON.parse(htmlData)
      // console.log(json)

      // 存储文件
      saveTxt(json, page)
      saveImg(json, page)

      // 控制下载的页数
      if (page <= 10) {
        console.log(`正在下载 page${page}`)
        page ++
        biliURL = `https://bangumi.bilibili.com/web_api/season/index_global?page=${page}&page_size=20&version=0&is_finish=0&start_year=0&tag_id=&index_type=1&index_sort=0&quarter=0`
        startRequest(biliURL)
      }
    })
  }).on('error', () => {
    console.log(error)
  })
}

// 在本地 txt 文件夹存储文本资源
function saveTxt(json, page) {
  let str = ''
  let jsonData = json.result.list
  // 拼接 json 数据
  for (let i = 0; i < jsonData.length; i++) {
    str += `${jsonData[i].title}\r\n追番：${jsonData[i].favorites}人\r\n链接：${jsonData[i].url}\r\n\r\n`
  }
  // 存储成文件
  fs.appendFile('./txt/第' + page + '页列表.txt', str, 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

// 在本地 img 文件夹存储图片资源
function saveImg(json, page) {
  let jsonData = json.result.list
  for (let i = 0; i < jsonData.length; i++) {
    let imgTitle = jsonData[i].title.replace(/\//g, '_'), // 替换掉名称中可能出现的斜杠 /
        imgUrl = jsonData[i].cover
        imgType = imgUrl.slice(imgUrl.lastIndexOf('.'))

    request.head(imgUrl, (err, res, body) => {
      if (err) {
        console.log(err)
      }
    })
    request(imgUrl)
      .pipe(fs.createWriteStream('./img/' + page + '_' + imgTitle + imgType))
      .on('error', (err) => {
        if (err) {
          console.log(err)
        }
      })
  }
}

startRequest(biliURL)
