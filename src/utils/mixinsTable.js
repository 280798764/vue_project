/* 表单相关mixins */
import tool from '@/utils/tool'
import { CustomTable, Pagination, DateRange } from '@/components/modules'

export default {
  data () {
    return {
      pageInfo: {}, // 接收的分页信息
      pageInfoReq: { // 用于请求的分页信息
        page: 1,
        rows: 10
      },
      isShowDlgConfirmReason: false, // 确认弹窗标识（需要原因）
      dlgConfirmReasonMap: ['删除', '撤销', '驳回', '转交'],
      dlgReasonParams: {
        dlgType: 0, // 弹窗类型，['0删除', '1撤销', '2驳回', '3转交']
        dlgId: '', // 弹窗id
        dlgCmd: '' // 弹窗cmd
      },
      dlgConfirmMap: [ // 确认弹窗（无需原因）
        {
          id: 0,
          label: '删除',
          description: '确定删除该条数据？'
        }, {
          id: 1,
          label: '撤销',
          description: '撤销后不可恢复，确定撤销？'
        }, {
          id: 2,
          label: '提交',
          description: '确定提交该条数据？'
        }, {
          id: 3,
          label: '审核',
          description: '确定审核通过该单子？'
        }
      ]
    }
  },
  components: {
    CustomTable,
    Pagination,
    DateRange
  },
  created () {
    // 获取登陆角色
    this.roleType = sessionStorage.getItem('roleType')
    // 若有保持的过滤条件，则还原过滤参数
    let page = +tool.getPage()
    if (page > 0) {
      this.params = tool.getFilterParams()
      this.pageInfoReq.page = page
    }
  },
  methods: {
    // 点击查询按钮或者回车查询，重置页码为1
    searchBtn () {
      this.pageInfoReq.page = 1
      this.search()
    },
    // 保存过滤参数及页码
    saveFilterParams (params, page) {
      tool.setFilterParams(params)
      tool.setPage(page)
    },
    // 新建单子
    create (path) {
      sessionStorage.removeItem('levelOneId')
      sessionStorage.removeItem('levelTwoId')
      sessionStorage.setItem('pageTypeLv1', 'add')
      this.$router.push(path)
    },
    // 获取表单数据通用方法
    getTableList (cmd, params) {
      this.$store.dispatch(cmd, {parameters: {...params}, ...this.pageInfoReq}).then(
        res => {
          this.tbody = res.list
          this.pageInfo = res.pageInfo
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 页码切换
    pageChange (page) {
      this.pageInfoReq.page = +page
      this.search()
    },
    // 跳转至详情页面, level：列表页不传, 当前详情页等级1234...依次类推
    readRecord (id, path, level) {
      if (!level) {
        sessionStorage.setItem('levelOneId', id)
        sessionStorage.setItem('pageTypeLv1', 'show')
      } else if (level === 1) {
        sessionStorage.setItem('levelTwoId', id)
        sessionStorage.setItem('pageTypeLv2', 'show')
      } else if (level === 2) {
        sessionStorage.setItem('levelThreeId', id)
        sessionStorage.setItem('pageTypeLv3', 'show')
      }
      this.$router.push(path)
    },
    // 跳转至编辑页面, 当前编辑页等级1234...依次类推
    editRecord (id, path, level) {
      if (level === 1) {
        sessionStorage.setItem('levelTwoId', id)
        sessionStorage.setItem('pageTypeLv2', 'edit')
      } else if (level === 2) {
        sessionStorage.setItem('levelThreeId', id)
        sessionStorage.setItem('pageTypeLv3', 'edit')
      }
      this.$router.push(path)
    },
    // 通用弹窗确认方法(无需原因), labelType: 对应dlgConfirmMap索引, pageType: 标识列表页OR详情页（list, detail）,isSubList: 是否是子列表里的方法(子页面删除不跳转)
    dlgConfirm (id, cmd, labelType, pageType, isSubList) {
      this.$Modal.confirm({
        title: '提示',
        content: this.dlgConfirmMap[labelType].description,
        onOk: () => {
          this.dlgDispatch(id, cmd, labelType, pageType, isSubList)
        }
      })
    },
    // 通用确认执行方法(无需原因)
    dlgDispatch (id, cmd, labelType, pageType, isSubList) {
      this.$store.dispatch(cmd, {id}).then(
        res => {
          // 判断是列表页还是详情页
          if (pageType === 'detail') {
            if (isSubList) {
              this.alert(this.dlgConfirmMap[labelType].label + '成功！', 'success')
              this.$parent.refreshList() // 刷新列表
            } else {
              this.showDlgSuccess(this.dlgConfirmMap[labelType].label)
            }
          } else {
            this.search() // 列表页刷新
            this.alert(this.dlgConfirmMap[labelType].label + '成功！', 'success')
          }
        },
        rej => {
          this.alert(this.dlgConfirmMap[labelType].label + '失败，' + rej.errorInfo, 'error')
        }
      )
    },
    // 通用弹窗确认方法(需要原因),labelType: 弹窗类型，pageType: 标识列表页OR详情页
    dlgConfirmReason (id, cmd, labelType, pageType) {
      this.dlgReasonParams = {
        id: id,
        cmd: cmd,
        label: this.dlgConfirmReasonMap[labelType],
        pageType: pageType
      }
      this.isShowDlgConfirmReason = true
    },
    // 成功弹窗(增加300ms延时，提示弹窗消失后再次加载成功提示)
    showDlgSuccess (msg) {
      setTimeout(() => {
        this.$Modal.success({
          title: '提示',
          content: msg + '成功！',
          onOk: () => {
            this.backForward() // 详情页跳转至列表页
          }
        })
      }, 300)
    }
  }
}
