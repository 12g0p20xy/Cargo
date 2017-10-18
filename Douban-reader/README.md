## 简介

![](GIF.gif)

书籍搜索器，可以查询豆瓣上的书籍信息，评分和用户笔记。

使用技术：Vue、Vuex、Vue-router、Fetch 等。

功能：

- [x] 关键词搜索、tag 搜索

- [x] 自动搜索建议

- [x] 加载动画

## 豆瓣 Api

[豆瓣Api V2（测试版）](https://developers.douban.com/wiki/?title=api_v2)

`GET  https://api.douban.com/v2/book/:id`

`GET  https://api.douban.com/v2/book/search`

`GET  https://api.douban.com/v2/book/:id/annotations`