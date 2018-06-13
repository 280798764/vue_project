<template>
  <section class="nav-wrapper">
    <ul v-for="(nav, index) in dataNavList" :key="index">
      <li class="parent" @click="toggleNav(index)">
        <i class="iconfont" :class="nav.icon"></i>
        <span>{{nav.name}}</span>
        <i class="iconfont" :class="nav.isOpen?'nav-arrow-up':'nav-arrow-down'"></i>
      </li>
      <li v-show="nav.isOpen" v-for="(subnav, subIndex) in nav.children" class="child" :key="subIndex">
        <router-link tag="div" :to="subnav.path">{{subnav.name}}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      dataNavList: this.navList
    }
  },
  props: {
    navList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toggleNav (index) {
      this.dataNavList.forEach((item, i) => {
        item.isOpen = index === i ? !item.isOpen : false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/modules/navigation.less';
</style>
