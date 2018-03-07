<template>
  <table>
    <thead>
      <td>Name</td>
      <td @click="orderForm">
        Power
        <i :class="{ active: active }"></i>
      </td>
    </thead>
    <tr v-for="item in data">
      <td>{{ item.name }}</td>
      <td>{{ item.power }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      active: false
    }
  },
  methods: {
    orderForm() {
      this.active = !this.active
      if (this.active) {
        this.data.sort((a, b) => {
          if (a.power > b.power) {
            return -1
          }
          if (a.power < b.power) {
            return 1
          }
          return 0
        })
      }
      else {
        this.data.sort((a, b) => {
          if (a.power < b.power) {
            return -1
          }
          if (a.power > b.power) {
            return 1
          }
          return 0
        })
      }
    }
  }
}
</script>