<!-- 页面跳转 -->
<template>
  <section class="pagination-wrapper">
    <div class="left">
      <span>跳转至</span>
      <input type="text" v-model.trim="page" v-on:blur="jumpTo" v-on:keyup.enter="jumpTo">
      <span>页</span>
    </div>
    <div class="right">
      <div class="page-info">
        <span class="first-page" :class="{disabled: pageInfo.isFirstPage}" @click="gotoFirstPage">首页</span>
        <span class="prev-page iconfont icon-pagination-arrow-left" :class="{disabled: !pageInfo.hasPreviousPage}" @click="gotoPrevPage" title="前一页"></span>
        <div class="pages-wrapper" @click="paginationAgent">
          <ul>
            <!-- 当前页码 之前列表 -->
            <template v-if="pageInfo.page - 1 < 4">
              <li v-for="(num, index) in pageInfo.page - 1" class="clickable" :key="index">{{num}}</li>
            </template>
            <template v-else>
              <li class="clickable">1</li>
              <li class="ellipsis">…</li>
              <li class="clickable">{{pageInfo.page - 1}}</li>
            </template>
            <!-- 当前页码 -->
            <li class="active">{{pageInfo.page}}</li>
            <!-- 当前页码 之后列表 -->
            <template v-if="pageInfo.pages - pageInfo.page < 4">
              <li v-for="(num, index) in pageInfo.pages - pageInfo.page" class="clickable" :key="index">{{pageInfo.page + num}}</li>
            </template>
            <template v-else>
              <li class="clickable">{{pageInfo.page + 1}}</li>
              <li class="ellipsis">…</li>
              <li class="clickable">{{pageInfo.pages}}</li>
            </template>
          </ul>
        </div>
        <span class="next-page iconfont icon-pagination-arrow-right" :class="{disabled: !pageInfo.hasNextPage}" @click="gotoNextPage" title="后一页"></span>
        <span class="last-page" :class="{disabled: pageInfo.isLastPage}" @click="gotoLastPage">尾页</span>
      </div>
      <div class="total-pages">
        <span>共</span>
        <span class="count">{{pageInfo.pages}}</span>
        <span>页</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      page: 1
    }
  },
  props: {
    pageInfo: Object
  },
  created () {
    this.page = this.pageInfo.page
  },
  methods: {
    // 跳页
    jumpTo () {
      if (this.page >= 1 && this.page <= this.pageInfo.pages && this.page !== this.pageInfo.page) {
        this.$emit('pageChange', +this.page)
      } else {
        this.clearNotice()
        this.alert('请输入正确的页码', 'info')
      }
    },
    // 页码列表 事件代理
    paginationAgent (e) {
      e.stopPropagation()
      if (e.target.className === 'clickable') {
        this.$emit('pageChange', +e.target.innerText)
      }
    },
    // 切换至首页
    gotoFirstPage () {
      if (this.pageInfo.page !== 1) this.$emit('pageChange', 1)
    },
    // 切换至尾页
    gotoLastPage () {
      if (this.pageInfo.page !== this.pageInfo.pages) this.$emit('pageChange', this.pageInfo.pages)
    },
    // 切换至前一页
    gotoPrevPage () {
      if (this.pageInfo.page > 1) this.$emit('pageChange', this.pageInfo.page - 1)
    },
    // 切换至后一页
    gotoNextPage () {
      if (this.pageInfo.page < this.pageInfo.pages) this.$emit('pageChange', this.pageInfo.page + 1)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/assets/styles/modules/pagination.less";
</style>
