<!-- 棋格 -->
<template>
  <button class="square">{{ val }}</button>
</template>

<script>
export default {
  // props: [ 'val' ],
  data() {
    return {
      val: ''
    }
  },
  methods: {
    updateStep(val) {
      if (!this.val) {
        this.val = val
        this.$emit('stepChanged')
      }
    }
  }
}
</script>