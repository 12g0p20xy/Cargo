module.exports = function() {
  const faker = require("faker")
  faker.locale = "zh_CN"
  const _ = require("lodash")
  return {
    list_data: _.times(10, function(n) {
      return {
        id: n,
        name: faker.commerce.productName(),
        prize: faker.commerce.price(),
        img: faker.internet.avatar(),
        value: 1,
        checked: false,
        discount: '-' + parseInt(Math.random() * 100) + '%'
      }
    })
  }
}