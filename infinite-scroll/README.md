## 简介

Vue 实现无限滚动加载，使用 [JSON Server]((https://github.com/typicode/json-server)) + [Faker.js](https://github.com/Marak/faker.js) Mock 数据。

## 用法

1、全局安装 JSON Server

```bash
cnpm install -g json-server
```

2、在 `src/mock/faker-data.js` 中配置假数据结构：

```js
people: _.times(100, function(n) {
  return {
    id: n,
    name: faker.name.firstName() + faker.name.lastName(),
    price: faker.commerce.price(),
    img: faker.internet.avatar()
  }
}),
```

[官方 API](https://github.com/Marak/faker.js#api-methods)

3、控制台运行：

```bash
npm run mockdev
```

调整浏览器高度，滚动页面查看加载效果。

可以访问路径：`http://localhost:3000/people` 查看生成的 JSON 数据。