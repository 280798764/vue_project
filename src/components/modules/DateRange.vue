<!-- 日期范围组件 -->
<template>
  <div class="range-wrapper">
    <label :style="{width: labelWid}">{{label}}</label>
    <div class="date-picker-wrapper"><Date-picker type="date" v-model="modelDateFrom" :editable="true" :options="options" format="yyyy-MM-dd" placeholder="选择日期"></Date-picker></div>
    <label class="wid-30px">—</label>
    <div class="date-picker-wrapper"><Date-picker type="date" v-model="modelDateTo" :editable="true" :options="options" format="yyyy-MM-dd" placeholder="选择日期"></Date-picker></div>
  </div>
</template>

<script>
import tool from '@/utils/tool'

export default {
  data () {
    return {
      modelDateFrom: this.dateFrom,
      modelDateTo: this.dateTo || new Date()
    }
  },
  props: {
    dateFrom: '',
    dateTo: '',
    label: {
      type: String,
      default: '日期'
    },
    labelWid: {
      type: String,
      default: '100px'
    },
    disabledDate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    options () {
      if (this.disabledDate) {
        return {
          disabledDate (date) {
            return date && date.valueOf() > Date.now()
          }
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    // 获取日期
    getDateRange () {
      return {
        dateFrom: this.modelDateFrom ? tool.dateFormat(this.modelDateFrom, 'yyyy-MM-dd') : '',
        dateTo: this.modelDateTo ? tool.dateFormat(this.modelDateTo, 'yyyy-MM-dd') : ''
      }
    },
    // 核对日期
    checkDate () {
      this.clearNotice()
      if (this.modelDateFrom && this.modelDateTo && this.modelDateFrom > this.modelDateTo) {
        this.alert(this.label.substr(0, 2) + '开始日期不能大于结束日期', 'info')
      }
    }
  },
  watch: {
    modelDateFrom () {
      this.checkDate()
    },
    modelDateTo () {
      this.checkDate()
    }
  }
}
</script>

<style lang="less" scoped>
  .range-wrapper {
    display: flex;
    label {
      width: 65px;
      margin-right: 10px;
      text-align: right;
    }
  }
</style>
