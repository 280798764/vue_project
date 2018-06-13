/* 这里是页面备注 */
<template>
  <section>
    <h1>{{msg}} !!</h1>
  </section>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome'
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/pages/index/Index.less';
</style>
