import path from 'path'

const pathResolve = (dir) => {
  return path.resolve(process.cwd(), '.', dir)
}
//获取基路径
const getBaseUrl = (type) => {
  const env = import.meta.env
  let baseURL
  const isDev = env.MODE === 'development' && env.VITE_PUBLIC_USE_PROXY === '1'
  if (type == 1) {
    baseURL = isDev ? env.VITE_APP_API_Dev_URL : env.VITE_APP_API_BASE_URL
  }
  return baseURL
}

export { pathResolve, getBaseUrl }
