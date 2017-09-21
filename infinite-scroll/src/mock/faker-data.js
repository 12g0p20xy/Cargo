module.exports = function() {
  const faker = require("faker")
  faker.locale = "zh_CN"
  const _ = require("lodash")
  return {
    list_data: _.times(15, function(n) {
      return {
        id: n,
        name: faker.name.firstName() + faker.name.lastName(),
        price: faker.commerce.price(),
        img: faker.internet.avatar()
      }
    }),
    list_data_1: _.times(15, function(n) {
      return {
        id: n,
        name: faker.name.firstName() + faker.name.lastName(),
        price: faker.commerce.price(),
        img: faker.internet.avatar()
      }
    }),
    list_data_2: _.times(15, function(n) {
      return {
        id: n,
        name: faker.name.firstName() + faker.name.lastName(),
        price: faker.commerce.price(),
        img: faker.internet.avatar()
      }
    }),
    list_data_3: _.times(15, function(n) {
      return {
        id: n,
        name: faker.name.firstName() + faker.name.lastName(),
        price: faker.commerce.price(),
        img: faker.internet.avatar()
      }
    }),
    list_data_4: _.times(15, function(n) {
      return {
        id: n,
        name: faker.name.firstName() + faker.name.lastName(),
        price: faker.commerce.price(),
        img: faker.internet.avatar()
      }
    })
  }
}