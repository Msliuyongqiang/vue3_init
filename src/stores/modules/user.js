import moment from 'moment'
const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      jobNumber: ''
    },
    selectTime: moment().subtract(1, 'months').format('YYYYMM')
  }),
  actions: {}
})

export default useUserStore
