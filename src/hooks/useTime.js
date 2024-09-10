import moment from 'moment'

const getWeek = {
  Monday: '星期一',
  Tuesday: '星期二',
  Wednesday: '星期三',
  Thursday: '星期四',
  Friday: '星期五',
  Saturday: '星期六',
  Sunday: '星期日'
}

export function useTime() {
  const timeList = reactive({
    time: '',
    week: '',
    data: '',
    interval: null
  })

  const updateClock = () => {
    timeList.time = moment().format('HH:mm:ss')
    timeList.week = moment().format('dddd')
    timeList.week = getWeek[timeList.week] || '未匹配到星期几'
    timeList.data = moment().format('YYYY-MM-DD')
  }

  onMounted(() => {
    updateClock()
    timeList.interval = setInterval(updateClock, 1000)
  })

  onUnmounted(() => {
    clearInterval(timeList.interval)
  })

  return timeList
}
