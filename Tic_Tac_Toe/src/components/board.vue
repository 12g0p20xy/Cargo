<!-- 棋盘 -->
<template>
  <div class="board">
    <square
      v-for="(item, index) in 9"
      :key="index"
      ref="btn"
      @click.native="pushStep(index)"
      @stepChanged="changePlayer(index)">
    </square>
    <p v-if="gameOver">Winner is: {{ player }}</p>
    <p v-else>Next player: {{ player }}</p>
    <button @click="restart">重新开始</button>
    <button @click="backStep">悔 棋</button>
  </div>
</template>

<script>
import Square from './square.vue'
export default {
  components: {
    Square
  },
  data() {
    return {
      player: 'X',
      step: true,
      gameOver: false,
      // 记录所有格子的值
      squares: [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
      // 记录操作历史
      history: [
        [
          '', '', '',
          '', '', '',
          '', '', ''
        ]
      ]
    }
  },
  methods: {
    pushStep(i) {
      if (!this.gameOver) {
        // 更新对应格子的值
        this.$children[i].updateStep(this.player)
        this.step = !this.step
        this.player = this.step ? 'X' : 'O'
      }
    },
    changePlayer(i) {
      // 格子的值发生了更新
      this.squares[i] = this.player
      // 更新历史记录
      let arrTemp = this.squares.map((el) => {
        return el
      })
      this.history.push(arrTemp)

      // 检测是否有连线成立
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]
      lines.forEach((line) => {
        if(this.squares[line[0]] && this.squares[line[0]] === this.squares[line[1]] && this.squares[line[1]] === this.squares[line[2]]) {
          this.$refs.btn[line[0]].$el.className += ' active'
          this.$refs.btn[line[1]].$el.className += ' active'
          this.$refs.btn[line[2]].$el.className += ' active'
          // console.log(this.$refs.btn[line[0]].$el)
          this.step = !this.step
          this.player = this.step ? 'X' : 'O'
          this.gameOver = true
        }
      })

    },
    // 重置
    restart() {
      this.$children.forEach((el) => {
        el.val = ''
      })
      this.squares = [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
      this.history = [
        [
          '', '', '',
          '', '', '',
          '', '', ''
        ]
      ]
      this.step = true
      this.player = 'X'
      this.gameOver = false
      this.$refs.btn.forEach((el) => {
        el.$el.className = 'square'
      })
    },
    // 悔棋
    backStep() {
      if (this.history.length > 1) {
        this.history.pop()
        this.squares = this.history[this.history.length - 1].map((el) => {
          return el
        })
        this.$children.forEach((el, index) => {
          el.val = this.squares[index]
        })
        this.step = !this.step
        this.player = this.step ? 'X' : 'O'
      }
    }
  }
}
</script>
