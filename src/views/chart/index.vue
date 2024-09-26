<template>
  <div class="chat-area">
    <div v-for="message in messages" :key="message.id" class="chart-content">
      <div class="avatar">{{ message.author }}</div>
      <div class="message">
        <div class="message-content">
          <!-- <div class="content">{{ message.author }}：{{ message.content }}</div> -->
          <div class="content">
            <!-- <div class="author">{{ message.author }}</div> -->
            {{ message.content }}
          </div>
          <div class="message-conOption">
            <span>{{ message.time }}</span>
            <span @click="replyToMessage(message)">回复</span>
          </div>
        </div>
        <!-- 回复列表 -->
        <div v-if="message.isExpanded" class="replies">
          <div v-for="reply in message.replies" :key="reply.id" class="reply-item">
            <span>{{ reply.author }} 回复 {{ reply.to }}：{{ reply.content }}</span>
            <!-- 时间和回复按钮 -->
            <div class="reply-meta">
              <span>{{ reply.time }}</span>
              <!-- 回复按钮 -->
              <span class="replayTwoLevel" @click="replyToMessage(message, reply.author)">回复</span>
            </div>
          </div>
        </div>

        <div class="message-actions">
          <span v-if="message.replies.length > 0"> 共 {{ message.replies.length }} 条回复， </span>
          <!-- 展开/收起回复按钮 -->
          <span class="isExpand" v-if="message.replies.length > 0" @click="toggleReplies(message)">
            {{ message.isExpanded ? '收起' : '点击查看' }}
          </span>
        </div>

        <!-- 回复输入框 -->
        <div v-if="replyTarget.message === message && isReplyBoxVisible" class="reply-box">
          <!-- <div class="replying-to">正在回复 @{{ replyTarget.to || message.author }}</div> -->
          <el-input v-model="newReply" :placeholder="placeholderTip" type="textarea" maxlength="50" show-word-limit />
          <el-button type="primary" @click="sendReply" style="height: 100%">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import moment from 'moment'
// 当前用户
const currentUser = '暖心pro'

// 初始化消息列表
const messages = ref([
  {
    id: 1,
    author: '暖心',
    content: '暖心pro哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
    time: '2024-09-25 18:00',
    replies: [
      {
        id: 1,
        author: '用户B',
        to: '用户A',
        content: '真厉害',
        time: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 2,
        author: '用户C',
        to: '用户A',
        content: '真牛',
        time: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')
      }
    ],
    isExpanded: false
  },
  {
    id: 2,
    author: '李某',
    content: '你什么身份？',
    time: '2024-09-25 19:00',
    replies: [],
    isExpanded: false
  }
])

// 定义响应式变量
const newReply = ref('')
const replyTarget = ref({ message: null, to: null }) // 被回复的消息和被回复者
const isReplyBoxVisible = ref(false) // 回复输入框的显示状态

const placeholderTip = computed(() => {
  return replyTarget.value.to ? `回复 @${replyTarget.value.to}:` : `回复 ${replyTarget.value.message.author}:`
})

// 展开或收起回复内容
const toggleReplies = (message) => {
  message.isExpanded = !message.isExpanded
}

// 点击“回复”按钮
const replyToMessage = (message, to = null) => {
  if (replyTarget.value.message === message && isReplyBoxVisible.value && replyTarget.value.to === to) {
    // 如果再次点击同一个，切换输入框显示状态
    isReplyBoxVisible.value = false
    replyTarget.value = { message: null, to: null }
    newReply.value = ''
  } else {
    // 切换到新的回复目标
    replyTarget.value = { message, to }
    isReplyBoxVisible.value = true
    newReply.value = ''
  }
}

// 发送回复
const sendReply = () => {
  if (newReply.value.trim()) {
    const newReplyObj = {
      id: Date.now(),
      author: currentUser,
      to: replyTarget.value.to || replyTarget.value.message.author,
      content: newReply.value,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    // 将新回复添加到消息的回复列表中
    replyTarget.value.message.replies.unshift(newReplyObj)

    // 确保回复列表展开
    if (!replyTarget.value.message.isExpanded) {
      replyTarget.value.message.isExpanded = true
    }

    // 清空输入框并重置回复目标
    newReply.value = ''
    replyTarget.value = { message: null, to: null }
    isReplyBoxVisible.value = false
  }
}
</script>

<style lang="scss" scoped>
.chat-area {
  max-width: 800px;
  margin: auto;
  padding: 10px;
  .chart-content {
    display: flex;
    column-gap: 10px;
    .avatar {
      background-color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .message {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      flex: 0 0 85%;
      .message-content {
        .content {
          font-size: 23px;
          line-height: 1.5;
        }
        .message-conOption {
          font-size: 15px;
          margin: 10px 0;
          color: #95999f;
          span:first-child {
            margin-right: 5px;
          }
          span:last-child {
            margin-left: 5px;
          }
        }
      }

      .message-actions {
        margin-top: 5px;
        font-size: 15px;
        color: #95999f;
        .isExpand {
          margin-right: 5px;
          cursor: pointer;
        }
        .isExpand:hover {
          color: #4eabe6;
        }
      }

      .replies {
        margin-left: 20px;
        padding-left: 10px;
        border-left: 2px solid #ddd;

        .reply-item {
          margin-top: 10px;

          .reply-meta {
            margin-top: 5px;
            display: flex;
            align-items: center;
            font-size: 15px;
            span {
              color: #95999f;
              margin-right: 10px;
            }
            .replayTwoLevel {
              cursor: pointer;
            }
            .replayTwoLevel:hover {
              color: #4eabe6;
            }
          }
        }
      }

      .reply-box {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .replying-to {
          margin-bottom: 5px;
          color: #555;
        }

        button {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
