<template>
  <div class="index">
    <top-nav :navActive="1"></top-nav>
    
    <main class="container-fluid">

      <div class="jumbotron">
        <h1>Hello, world!</h1>
        <p>...</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
      </div>
    </main>
  </div>
</template>

<script>
import topNav from './top-nav.vue'

export default {
  components: {
    topNav
  }
}
</script>