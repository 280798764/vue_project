<!-- 表单展示 -->
<template>
  <section class="table-wrapper custom-scroll" :class="{'scroll': isScroll}">
    <table :class="{'table-layout-fixed': isLayoutFixed}">
      <thead>
        <tr>
          <th v-for="(colName, index) in thead" :style="{width: typeof colName === 'object' && colName.width}" :key="index">{{typeof colName === 'string' ? colName : colName.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tbody" :class="{'highlight': !!item.highlight, 'lowlight': !!item.lowlight}" :key="index">
          <slot name="item" :item="item" :index="index"></slot>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  props: {
    thead: Array,
    tbody: Array,
    isLayoutFixed: {
      type: Boolean,
      default: false
    },
    isScroll: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/assets/styles/modules/custom-table.less";
</style>
