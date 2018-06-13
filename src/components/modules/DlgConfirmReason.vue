<!-- 撤销，驳回，转交等需要填写理由的弹窗 -->
<template>
  <section class="dialog-wrapper">
    <div class="dialog">
      <div class="dialog-header">
        <span>{{this.params.label}}提示</span>
        <span class="dlg-close"><i class="iconfont close" @click="cancel"></i></span>
      </div>
      <div class="dialog-body">
        <div class="line">
          <label class="required">{{this.params.label}}原因：</label>
        </div>
        <div class="line-textarea">
          <textarea v-model.trim="reason" :maxlength="maxLength" :placeholder="placeHolder"></textarea>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="btn btn-cancel" @click="cancel">取消</div>
        <div class="btn btn-sure" @click="ensure">确定</div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        reason: ''
      }
    },
    props: {
      params: {
        id: [Number, String],
        cmd: String,
        label: String,   // 标签名称
        pageType: String // 页面类型
      },
      maxLength: {
        type: Number,
        default: 99
      }
    },
    computed: {
      placeHolder () {
        return '请输入（限长' + this.maxLength + '字）...'
      }
    },
    methods: {
      // 确定
      ensure () {
        if (!this.reason) {
          this.clearNotice()
          this.alert('请填写' + this.params.label + '原因', 'info')
        } else {
          this.$store.dispatch(this.params.cmd, {id: this.params.id, reason: this.reason}).then(
            res => {
              if (this.params.pageType === 'detail') {
                // 二级页面
                this.$Modal.success({
                  title: '提示',
                  content: this.params.label + '成功！',
                  onOk: () => {
                    this.$parent.backForward()
                  }
                })
              } else {
                // 列表页
                this.$parent.search()
                this.alert(this.params.label + '成功！', 'success')
              }
              this.cancel()
            },
            rej => {
              this.alert(this.params.label + '失败，' + rej.errorInfo, 'error')
              this.cancel()
            }
          )
        }
      },
      // 取消
      cancel () {
        this.$parent.isShowDlgConfirmReason = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .dialog {
    .dialog-body {
      .line {
        border-bottom: none;
        label {
          justify-content: flex-start;
        }
      }
      .line-textarea {
        align-items: flex-start;
        border-bottom: none;
        textarea {
          width: 400px;
        }
      }
    }
  }
</style>
