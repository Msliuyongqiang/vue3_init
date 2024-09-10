import axios from 'axios'
import loading from './loading'
import { getBaseUrl } from '@/utils/common.js'
const SERVICE = axios.create({
  baseURL: getBaseUrl('1'),
  timeout: 1000 * 60 * 5,
  headers: {
    // 'Content-Type': 'text/plain',
  }
})

// 导出文件的请求接口
export function spostExport(path, filename, data) {
  return new Promise((resolve, reject) => {
    loading.open('正在导出,请稍后...')
    data = { ...data } || {}
    let post = SERVICE.post(path, data, {
      responseType: 'blob'
    })
    post
      .then(async (res) => {
        const blob = new Blob([res.data])
        const fileName = filename || '导出文件'
        if ('download' in document.createElement('a')) {
          const link = document.createElement('a')
          link.download = `${fileName}.xlsx`
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        }
        resolve()
        loading.close()
      })
      .catch(() => {
        loading.close()
        ElMessage({
          type: 'error',
          message: '导出失败'
        })
        reject()
      })
  })
}
