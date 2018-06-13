<template>
  <section class="app-wrapper">
    <header-bar/>
    <section class="container clearfix">
      <div class="side-wrapper">
        <sider-bar/>
      </div>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </section>
    <footer-bar/>
    <BackTop></BackTop>
  </section>
</template>

<script>
import HeaderBar from './Header'
import SiderBar from './Sider'
import FooterBar from './Footer'

export default {
  components: {
    HeaderBar,
    SiderBar,
    FooterBar
  }
}
</script>

<style lang="less" scoped>
  .app-wrapper {
    position: relative;
    min-height: 100vh;
    padding-bottom: 50px; // 根据footer高度自定义
    .container {
      display: block;
      margin: 18px auto 0;
      width: 1200px;
      background: #F1F1F1;
      .side-wrapper {
        float: left;
        width: 165px;
        border-left: 1px solid #F4E9E9;
        border-right: 1px solid #F4E9E9;
        background-color: #fff;
      }
      .content-wrapper {
        float: right;
        margin-bottom: 50px;
        width: 1020px;
        color: #333;
        min-height: 400px;
        background: #fff;
      }
    }
  }
</style>
