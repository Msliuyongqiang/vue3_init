import moment from 'moment'
export const chatData = [
  {
    id: 1,
    author: '暖心',
    content: '暖心pro, 你很牛吗？',
    time: '2024-09-25 18:00',
    replies: [
      {
        id: 1,
        author: '用户B',
        to: '暖心',
        content: '小母牛去南极--牛逼到了极点',
        time: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 2,
        author: '用户C',
        to: '用户B',
        content: '爽子哥表示真牛',
        time: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 3,
        author: '用户D',
        to: '暖心',
        content: '小母牛来月经--血牛逼',
        time: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 4,
        author: '用户G',
        to: '用户E',
        content: '强哥觉得真牛',
        time: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 5,
        author: '用户K',
        to: '暖心',
        content: '6666',
        time: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 6,
        author: '用户I',
        to: '用户H',
        content: '太酷啦',
        time: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 7,
        author: '用户G',
        to: '用户B',
        content: '🐮🍺',
        time: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 8,
        author: '用户D',
        to: '暖心',
        content: '绝了',
        time: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 9,
        author: '用户K',
        to: '用户H',
        content: '',
        time: '2024-09-25 17:31:56'
      }
    ],
    isExpanded: false
  },
  {
    id: 2,
    author: '李某',
    content: '你什么身份？',
    time: '2024-09-25 19:00',
    replies: [
      {
        id: 1,
        author: '用户L',
        to: '李某',
        content: '三岁母牛不下崽--牛逼坏了',
        time: '2024-09-23 10:21:32'
      }
    ],
    isExpanded: false
  }
]
