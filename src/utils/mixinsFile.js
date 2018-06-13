/* 文件相关mixins */
export default {
  methods: {
    // 文件上传事件
    uploadFile (cmd) {
      if (cmd) {
        var input = document.createElement('input')
        input.id = 'fileUpload'
        input.type = 'file'
        input.style.display = 'none'
        // 第一次导入的场合，添加input[type=file]
        if (!document.getElementById('fileUpload')) {
          document.getElementsByTagName('body')[0].appendChild(input)
        }
        document.getElementById('fileUpload').click()
        document.getElementById('fileUpload').onchange = e => {
          this.uploadFileToCloud(e, cmd)
        }
      }
    },
    // 文件上传到云
    uploadFileToCloud (e, cmd) {
      let file = e.target.files && e.target.files[0]
      let fileType = file.name && file.name.substring(file.name.lastIndexOf('.'))
      if (file === '' || file === null) {
        this.alert('请选择所要上传的文件！', 'info')
      } else if (fileType !== '.xls' && fileType !== '.xlsx') {
        this.alert('上传文件格式不正确!', 'info')
      } else {
        this.$store.dispatch('a:file/fileUpload', {file, cmd}).then(
          res => {
            if (res.success) {
              this.alert('文件导入成功！', 'success')
            } else {
              this.alert(res.errMsg, 'error')
            }
            document.getElementById('fileUpload').value = ''
            this.search()
          },
          rej => {
            this.alert(rej.errorInfo)
            document.getElementById('fileUpload').value = ''
          }
        )
      }
    }
  }
}
