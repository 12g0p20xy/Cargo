## 3x3 井字棋

[【Demo】](http://ovhkjvhoy.bkt.clouddn.com/Tic_Tac_Toe/dist/index.html)

数组 squares 记录所有格子的值：

```js
squares: [
  '', '', '',
  '', '', '',
  '', '', ''
]
```

每次操作给 history 新增一个当前的 squares 数组用于回退历史记录：

```js
history: [
  [
    '', '', '',
    '', '', '',
    '', '', ''
  ],
  [
    'X', '', '',
    '', '', 'O',
    '', '', ''
  ],
  ...
]
```