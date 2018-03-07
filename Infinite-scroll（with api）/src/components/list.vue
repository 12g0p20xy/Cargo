<template>
	<ul>
   <li v-for="li in lists">
     <h3>{{ li.title }}</h3>
     <small>{{ li.author.loginname }}</small>
     <p>{{ li.create_at }}</p>
   </li> 
  </ul>
</template>

<script>
import news from '../api/news.js'

export default {
  data() {
    return {
      lists: [],
      limit: 10
    }
  },
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.get()
  },
  watch: {
    page(val) {
      this.get()
    }
  },
  methods: {
    get() {
      news.getList({ page: this.page, limit: this.limit }, (err, json) => {
        if (err) {
          console.log(err)
        }
        else {
          json.data.forEach((data) => {
            const d = new Date(data.create_at)
            data.create_at = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
          })
          this.lists = this.lists.concat(json.data)
        }
      })
    }
  }
}  
</script>