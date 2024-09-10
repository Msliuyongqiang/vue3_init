import { ElLoading } from 'element-plus'
const loading = {
  loadingInstance: null,
  open(title) {
    if (this.loadingInstance === null) {
      this.loadingInstance = ElLoading.service({
        text: `${title || '拼命加载中...'}`,
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  },
  close() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  }
}

export default loading
