/* 登陆页面 仿http://malladmin.isesoldev.com/#/public/login */
<template>
  <section class="loginInfo">
    <div class="header">
      <!-- <div class="logo"><img src="../../assets/image/header-Logo.png" alt=""/></div> -->
      <div class="title"><span></span>iSESOL MALL 管理后台</div>
    </div>
    <div class="bg"></div>
    <div class="content">
      <div class="content-top">
        <!-- <img src="../../assets/image/loginTop.png" alt=""/> -->
      </div>
      <div class="content-info">
        <i class="iconfont icon-3"></i>
        <i class="iconfont icon-guanbi left" @click="clearUsername"></i>
        <input type="text" id="mobile" v-model="params.mobile" placeholder="请输入账号">
        <i class="iconfont icon-password"></i>
        <i class="iconfont icon-guanbi left" @click="clearPassword"></i>
        <input type="password" id="password" v-model="params.password" placeholder="请输入密码">
        <div class="verify">
          <i class="iconfont icon-iconzhenghe0729fuzhi93 special"></i>
          <input type="text" v-model="params.verifyValue" @keyup.enter="login" placeholder="请输入验证码 ">
          <div class="verifyImg" @click="getImg"><img :src="verifyImg"></div>
        </div>
        <div class="error-info" v-if="errorInfoShow">
          {{errorInfo}}
        </div>
        <div class="button">
          <button class="reset" @click="reset">重置</button>
          <button class="login" @click="login">登录</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      errorInfoShow: false,
      errorInfo: '', // 错误信息提示
      params: {
        // loginAccount: '',
        mobile: '',
        password: '',
        verifyKey: '',
        verifyValue: ''
      }
    }
  },
  computed: mapState({
    // verifyImg: state => state.common.account.verifyImg
  }),
  methods: {
    init () {
      this.getImg()
    },
    getImg () {
      this.params.verifyKey = Math.random()
      this.$store.dispatch('a:account/getVerifyImg', this.params.verifyKey)
    },
    login () {
      // 非空字段验证
      if (!this.params.mobile) {
        this.errorInfo = '请输入账号!'
        this.errorInfoShow = true
      } else if (!this.params.password) {
        this.errorInfo = '请输入密码!'
        this.errorInfoShow = true
      } else {
        this.$store.dispatch('a:common/account/login', this.params).then(
          res => {
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            } else {
              this.$router.push('/dashboard')
            }
          },
          rej => {
            this.getImg()
          }
        )
      }
    },
    reset () {
      this.params.userName = ''
      this.params.password = ''
      this.params.verifyValue = ''
    },
    clearUsername () {
      this.params.userName = ''
    },
    clearPassword () {
      this.params.password = ''
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/pages/login/login.less';
</style>
