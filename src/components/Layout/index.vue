<template>
  <div class="container">
    <div class="container_header">
      <div class="header_left">
        <div class="left_item_icon">
          <img src="@/assets/images/settle_account/logo.png" alt="" />
        </div>
        <div class="left_item_text">{{ props.title }}</div>
      </div>
      <div class="select_box_left">
        <div>账期:</div>
        <slot name="timeAccount"></slot>
      </div>
      <div class="header_right">
        <div class="right_time">
          {{ timeList.time }}
        </div>
        <div class="right_time_title">
          <div class="right_time_text">
            {{ timeList.week }}
          </div>
          <div class="right_time_date">
            {{ timeList.data }}
          </div>
        </div>
      </div>
    </div>
    <div class="container_body" :style="{ padding: props.padding }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { useTime } from '@/hooks/useTime'
const props = defineProps({
  title: {
    type: String,
    default: '结算体系数据分析看板'
  },
  padding: {
    type: String,
    default: '0px 20px 25px 20px'
  }
})

const timeList = useTime()
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: url(@/assets/images/settle_account/background.png);
  background-position: center 16%;
  background-repeat: no-repeat;
  background-size: cover;
  .container_header {
    box-sizing: border-box;
    padding: 0 25px;
    height: 9%;
    width: auto;
    //    background-color: #EDF3FD;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header_left {
      height: 70%;
      // width: 30%;
      // background-color: blue;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      .left_item_icon {
        height: 80%;
        > img {
          height: 100%;
        }
      }
      .left_item_text {
        font-size: 30px;
        font-weight: bold;
      }
    }
    .select_box_left {
      display: flex;
      align-items: center;
      gap: 5px;
      > div {
        font-size: 24px;
        font-weight: bold;
      }
      @include accountPeriod;
    }
    .header_right {
      height: 70%;
      width: 20%;
      // background-color: green;
      display: flex;
      justify-content: center;
      align-items: center;
      .right_time {
        height: 60%;
        width: 50%;
        border-right: 2px solid #b3bdd0;
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 35px;
        padding-right: 20px;
      }
      .right_time_title {
        width: 50%;
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        .right_time_text {
          font-size: 18px;
        }
        .right_time_date {
          font-size: 18px;
        }
      }
    }
  }
  .container_body {
    height: 91%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
