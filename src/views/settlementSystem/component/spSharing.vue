<template>
  <div class="innet_container">
    <div class="innet_header">
      <div class="innet_header_box">
        <div class="header_icon">
          <img src="@/assets/images/settle_account/marshalling.png" alt="" />
        </div>
        <div class="header_text" @click="clickToRoute">
          <div class="text_title">sp摊分结算税后收入</div>
          <div class="text">(万元)</div>
          <!-- <div class="year_tendency" @click="handle_year_tendency($event)">年趋势</div> -->
        </div>
      </div>
    </div>
    <div class="innetr_body">
      <div class="body_top">
        <div class="body_top_left">
          <div class="left_box">
            <div class="left_icon">
              <img src="@/assets/images/settle_account/chain_ratio_icon.png" alt="" />
            </div>
            <div
              v-loading="loading.YearOrquarteDataLoading"
              :element-loading-svg="svg"
              element-loading-background="#F0F4FD"
              element-loading-svg-view-box="-10, -10, 50, 50"
              class="left_text"
            >
              <div class="text_top">
                <div class="top_text">
                  {{ (queryDataValue.monthOnMonth && queryDataValue.monthOnMonth.name) || '' }}
                </div>
                <div class="top_type">
                  {{ (queryDataValue.monthOnMonth && queryDataValue.monthOnMonth.ratio) || '' }}%
                  <img
                    src="@/assets/images/settle_account/down_icon.png"
                    alt=""
                    v-if="
                      Number(queryDataValue.monthOnMonth && queryDataValue.monthOnMonth.ratio) < 0
                    "
                  />
                  <img src="@/assets/images/settle_account/up_icon.png" alt="" v-else />
                </div>
              </div>
              <div class="text_bottom">
                <div class="bottom_text">
                  {{ (queryDataValue.monthOnMonth && queryDataValue.monthOnMonth.netIncome) || '' }}
                </div>
                <div class="bottom_type">万元</div>
              </div>
            </div>
          </div>
        </div>
        <div class="body_top_right">
          <div class="left_box">
            <div class="left_icon">
              <img src="@/assets/images/settle_account/on_a_ year_icon.png" alt="" />
            </div>
            <div
              v-loading="loading.YearOrquarteDataLoading"
              :element-loading-svg="svg"
              element-loading-background="#EBF8FF"
              element-loading-svg-view-box="-10, -10, 50, 50"
              class="left_text"
            >
              <div class="text_top">
                <div class="top_text">
                  {{ (queryDataValue.yearOnYear && queryDataValue.yearOnYear.name) || '' }}
                </div>
                <div class="top_type">
                  {{ (queryDataValue.yearOnYear && queryDataValue.yearOnYear.ratio) || '' }}%
                  <img
                    src="@/assets/images/settle_account/down_icon.png"
                    alt=""
                    v-if="Number(queryDataValue.yearOnYear && queryDataValue.yearOnYear.ratio) < 0"
                  />
                  <img src="@/assets/images/settle_account/up_icon.png" alt="" v-else />
                </div>
              </div>
              <div class="text_bottom">
                <div class="bottom_text">
                  {{ (queryDataValue.yearOnYear && queryDataValue.yearOnYear.netIncome) || '' }}
                </div>
                <div class="bottom_type">万元</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="body_middle">
        <div class="body_middle_tittle">环比/同比</div>
        <div class="body_middle_body">
          <!-- :span-method="merge" 调用函数 -->
          <el-table
            v-loading="loading.table1DataLoading"
            :element-loading-svg="svg"
            element-loading-text="请稍后，正在加载中..."
            element-loading-svg-view-box="-10, -10, 50, 50"
            element-loading-background="rgb(255, 255, 255)"
            header-row-class-name="tabelHeaderStyle"
            align="center"
            :data="data"
            border
            style="width: 100%; height: 100%"
            :span-method="merge"
          >
            <el-table-column
              v-for="item in table1Header"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              align="center"
              :width="item.width"
            >
              <template #default="scoped" v-if="item.prop == 'monthOMonth'">
                <div style="color: #4f8ff4" v-if="scoped.row.monthOMonth">
                  {{ scoped.row.monthOMonth }}
                </div>
                <div style="color: #4f8ff4" v-else>--</div>
              </template>
            </el-table-column>
            <!-- <el-table-column label="" align="center" width="80" prop="id" />
                <el-table-column
                    label=""
                    align="center"
                    width="80"
                    prop="column1"
                />
                <el-table-column label="7月出账收入" align="center"  prop="column2" />
                <el-table-column label="6月出账收入" align="center" prop="column3" />
                <el-table-column label="7月和6月环比" align="center" >
                    <template v-slot:default="scoped">
                        <div style="color:#4F8FF4">
                            {{ scoped.row.column4 }}
                        </div>
                    </template>
                </el-table-column> -->
          </el-table>
        </div>
      </div>
      <div class="body_bottom">
        <div class="body_middle_tittle">全年累计同比</div>
        <div class="body_middle_body">
          <!-- :span-method="merge" 调用函数 -->
          <el-table
            v-loading="loading.table2DataLoading"
            :element-loading-svg="svg"
            element-loading-text="请稍后，正在加载中..."
            element-loading-svg-view-box="-10, -10, 50, 50"
            element-loading-background="rgb(255, 255, 255)"
            header-row-class-name="tabelHeaderStyle"
            align="center"
            :data="data2"
            border
            style="width: 100%; height: 100%"
          >
            <el-table-column
              v-for="item in table2Header"
              :key="item.column1"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              align="center"
            >
              <template #default="scoped" v-if="item.prop == 'yearOnYear'">
                <div style="color: #4f8ff4" v-if="scoped.row.yearOnYear">
                  {{ scoped.row.yearOnYear }}
                </div>
              </template></el-table-column
            >
            <!-- <el-table-column
                    width="80"
                    label=""
                    align="center"
                    prop="column1"
                />
                <el-table-column label="6月出账收入" align="center" >
                    <template v-slot:default="scoped">
                        <div style="color:#4F8FF4">
                            {{ scoped.row.column4 }}
                        </div>
                    </template>
                </el-table-column> -->
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { spost, newStore } from '@/plugins/spost'
import { Search, Refresh } from '@element-plus/icons-vue'
// import moment from 'moment'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  selectedDate: {
    // 账期
    type: String,
    default: ''
  }
})
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
const route = useRouter()
onMounted(() => {
  getYearOrquarteData()
  gettable1Data()
  gettable2Data()
})
watch(
  () => props.selectedDate,
  () => {
    console.log('触发了watch监听***********')

    getYearOrquarteData()
    gettable1Data()
    gettable2Data()
  }
)
const loading = reactive({
  YearOrquarteDataLoading: false,
  table1DataLoading: false,
  table2DataLoading: false
})
//获取同比环比的数据
const getYearOrquarteData = () => {
  loading.YearOrquarteDataLoading = true
  // spost({},'/api/v1/settlement/getYearOrquarteData',{
  //   date:props.selectedDate
  // }).then(res=>{
  //   // if(res.code==200){
  //   //   yearOrquarteData.value=res.data
  //   // }
  // })
  spost({}, '/sp/spLegend', {
    // yearMonth: props.selectedDate
    yearMonth: props.selectedDate
  })
    .then((res) => {
      console.log(res, 'ressssssssss')
      if (res.d.code == '0') {
        queryDataValue.value = res.d.data
      } else {
        queryDataValue.value = {
          monthOnMonth: {
            name: '环比',
            netIncome: '--',
            ratio: '--'
          },
          yearOnYear: {
            name: '同比',
            netIncome: '--',
            ratio: '--'
          }
        }
      }
    })
    .finally(() => {
      loading.YearOrquarteDataLoading = false
    })
  //   setTimeout(() => {
  //     queryDataValue.value={
  //     monthOnMonth: {
  //         name: '环比',
  //         netIncome: '2083.30',
  //         ratio: '-36.43'
  //     },
  //     yearOnYear: {
  //         name: '同比',
  //         netIncome: '284.93',
  //         ratio: '631.16'
  //     }
  // }
  //   }, 3000);
}
//获取同比环比的数据
const gettable1Data = () => {
  loading.table1DataLoading = true
  spost(newStore(), '/sp/spContras', {
    yearMonth: props.selectedDate
  })
    .then((res) => {
      if (res.d.code == '0') {
        console.log(res, 'resstable1')
        data.value = res.d.data.onlineContras
        table1Header.value = res.d.data.tableHeader
      } else {
        data.value = [
          {
            year: '2024年',
            fieldDetails: '暂估结算费用',
            curMonth: '--',
            preMonth: '--',
            monthOMonth: '--'
          },
          {
            year: '2024年',
            fieldDetails: '冲回结算费用',
            curMonth: '--',
            preMonth: '--',
            monthOMonth: '--'
          },
          {
            year: '2024年',
            fieldDetails: '实结结算费用',
            curMonth: '--',
            preMonth: '--',
            monthOMonth: '--'
          },
          {
            year: '2023年',
            fieldDetails: '暂估结算费用',
            curMonth: '--',
            preMonth: '--',
            monthOMonth: '--'
          },
          {
            year: '2023年',
            fieldDetails: '冲回结算费用',
            curMonth: '--',
            preMonth: '--',
            monthOMonth: '--'
          },
          {
            year: '2023年',
            fieldDetails: '实结结算费用',
            curMonth: '--',
            preMonth: '--',
            monthOMonth: '--'
          },
          {
            year: '同比',
            fieldDetails: '暂估结算费用',
            curMonth: '--',
            preMonth: '--',
            monthOMonth: '--'
          },
          {
            year: '同比',
            fieldDetails: '冲回结算费用',
            curMonth: '--',
            preMonth: '--',
            monthOMonth: '--'
          },
          {
            year: '同比',
            fieldDetails: '实结结算费用',
            curMonth: '--',
            preMonth: '--',
            monthOMonth: '--'
          }
        ]
        table1Header.value = [
          {
            prop: 'year',
            label: null
          },
          {
            prop: 'fieldDetails',
            label: null
          },
          {
            prop: 'curMonth',
            label: '7月'
          },
          {
            prop: 'preMonth',
            label: '6月'
          },
          {
            prop: 'monthOMonth',
            label: '环比'
          }
        ]
      }
    })
    .finally(() => {
      loading.table1DataLoading = false
    })
  // setTimeout(() => {
  //   data.value = [
  //     {
  //       year: '2024年',
  //       column1: '暂估结算费用',
  //       column2: '6793.10',
  //       column3: '7471.25',
  //       column4: '-678.16'
  //     },
  //     {
  //       year: '2024年',
  //       column1: '冲回结算费用',
  //       column2: '4709.79',
  //       column3: '4194.16',
  //       column4: '515.63'
  //     },
  //     {
  //       year: '2024年',
  //       column1: '实结结算费用',
  //       column2: '2083.30',
  //       column3: '3277.09',
  //       column4: '-1193.79'
  //     },
  //     {
  //       year: '2023年',
  //       column1: '暂估结算费用',
  //       column2: '6793.10',
  //       column3: '7471.25',
  //       column4: '-678.16'
  //     },
  //     {
  //       year: '2023年',
  //       column1: '冲回结算费用',
  //       column2: '4709.79',
  //       column3: '4194.16',
  //       column4: '515.63'
  //     },
  //     {
  //       year: '2023年',
  //       column1: '实结结算费用',
  //       column2: '2083.30',
  //       column3: '3277.09',
  //       column4: '-1193.79'
  //     },
  //     {
  //       year: '同比',
  //       column1: '暂估结算费用',
  //       column2: '6793.10',
  //       column3: '7471.25',
  //       column4: '-678.16'
  //     },
  //     {
  //       year: '同比',
  //       column1: '冲回结算费用',
  //       column2: '4709.79',
  //       column3: '4194.16',
  //       column4: '515.63'
  //     },
  //     {
  //       year: '同比',
  //       column1: '实结结算费用',
  //       column2: '2083.30',
  //       column3: '3277.09',
  //       column4: '-1193.79'
  //     }
  //   ]
  //   table1Header.value = [
  //     {
  //       prop: 'year',
  //       label: null
  //     },
  //     {
  //       prop: 'column1',
  //       label: null
  //     },
  //     {
  //       prop: 'column2',
  //       label: '7月'
  //     },
  //     {
  //       prop: 'column3',
  //       label: '6月'
  //     },
  //     {
  //       prop: 'column4',
  //       label: '环比'
  //     }
  //   ]
  //   loading.table1DataLoading = false
  // }, 1000)
}

//图例的数据
const queryDataValue = ref({})

//环比/同比数据的表头
const table1Header = ref([
  // {
  //   prop: "id",
  //   label: "",
  //   align: "center",
  // },
  // {
  //   prop: "column1",
  //   label: "",
  //   align: "center",
  // },
  // {
  //   prop: "column2",
  //   label: "7月出账收入",
  //   align: "center",
  // },
  // {
  //   prop: "column3",
  //   label: "6月出账收入",
  //   align: "center",
  // },
  // {
  //   prop: "column4",
  //   label: "7月和6月环比",
  //   align: "center",
  // },
])

//环比/同比数据数据表头
const data = ref([
  // {
  //   column1: '结算收入',
  //   column2: '1960.54',
  //   column3: '1960.54',
  //   column4: '1960.54'
  // },
  // {
  //   column1: '结算支出',
  //   column2: '162.16',
  //   column3: '162.16',
  //   column4: '162.16'
  // },
  // {
  //   column1: '结算净收入',
  //   column2: '1798.38',
  //   column3: '1798.38',
  //   column4: '1798.38'
  // }
])

//获取全年累计同比的数据
const gettable2Data = () => {
  loading.table2DataLoading = true
  spost(newStore(), '/sp/spContrasYear', {
    yearMonth: props.selectedDate
  })
    .then((res) => {
      console.log(res, 'resstable222222')
      if (res.d.code == '0') {
        data2.value = res.d.data.contrastYears
        table2Header.value = res.d.data.tableHeader
      } else {
        data2.value = [
          {
            fieldDetails: '暂估结算费用',
            curYear: '--',
            preYear: '--',
            yearOnYear: '--'
          },
          {
            fieldDetails: '冲回结算费用',
            curYear: '--',
            preYear: '--',
            yearOnYear: '--'
          },
          {
            fieldDetails: '实结结算费用',
            curYear: '--',
            preYear: '--',
            yearOnYear: '--'
          }
        ]
        table2Header.value = [
          {
            prop: 'fieldDetails',
            label: null
          },
          {
            prop: 'curYear',
            label: '2024年'
          },
          {
            prop: 'preYear',
            label: '2023年'
          },
          {
            prop: 'yearOnYear',
            label: '年累计同比'
          }
        ]
      }
    })
    .finally(() => {
      loading.table2DataLoading = false
    })
  // setTimeout(() => {
  //   data2.value = [
  //     {
  //       id: '2023年',
  //       column1: '结算收入',
  //       column2: '4832.56',
  //       column3: '4571.61',
  //       column4: '260.94'
  //     },
  //     {
  //       id: '2023年',
  //       column1: '结算支出',
  //       column2: '4547.64',
  //       column3: '4042.80',
  //       column4: '504.84'
  //     },
  //     {
  //       id: '净结算收入',
  //       column1: '净结算收入',
  //       column2: '284.92',
  //       column3: '528.81',
  //       column4: ''
  //     }
  //   ]
  //   table2Header.value = [
  //     {
  //       prop: 'column1',
  //       label: '',
  //       width: '',
  //       align: 'center'
  //     },
  //     {
  //       prop: 'column2',
  //       label: '2024年',
  //       width: '',
  //       align: 'center'
  //     },
  //     {
  //       prop: 'column3',
  //       label: '2023年',
  //       width: '',
  //       align: 'center'
  //     },
  //     {
  //       prop: 'column4',
  //       label: '年累计同比',
  //       width: '',
  //       align: 'center'
  //     }
  //   ]
  // }, 1000)
}

const table2Header = ref([])
//模拟数据
const data2 = ref([])
//处理年趋势
const handle_year_tendency = (event) => {
  alert('dianjil')
  event.stopPropagation()
}

//合并函数

//根据column1的值是否一致合并行并将数据上下居中
function merge({ rowIndex, columnIndex }) {
  //根据列索引判断是否需要合并
  // 1为第一列 可向后拼接(从0开始)，即2是第三列
  if (columnIndex === 0) {
    const currentRow = data.value[rowIndex]
    const rowCount = data.value.filter((item) => item.year === currentRow.year).length
    const firstIndex = data.value.findIndex((item) => item.year === currentRow.year)
    //如果当前行索引等于第一个索引，则合并行
    if (rowIndex === firstIndex) {
      //返回合并行的范围
      return {
        rowspan: rowCount,
        colspan: 1
      }
      //否则返回不合并
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
  return {
    rowspan: 1,
    colspan: 1
  }
}
function merge2({ rowIndex, columnIndex }) {
  //根据列索引判断是否需要合并
  // 1为第一列 可向后拼接(从0开始)，即2是第三列
  if (columnIndex === 0) {
    const currentRow = data2.value[rowIndex]
    const rowCount = data2.value.filter((item) => item.id === currentRow.id).length
    const firstIndex = data2.value.findIndex((item) => item.id === currentRow.id)
    //如果当前行索引等于第一个索引，则合并行
    if (rowIndex === firstIndex) {
      //返回合并行的范围
      return {
        rowspan: rowCount,
        colspan: 1
      }
      //否则返回不合并
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
  return {
    rowspan: 1,
    colspan: 1
  }
}
const clickToRoute = () => {
  console.log(route, '****************')
  route.push({
    path: 'tanFenSettlement',
    query: { selectedDate: props.selectedDate, anotherKey: 'anotherValue' }
  })
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.innet_container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .innet_header {
    height: 9%;
    width: 100%;
    // background-color: green;
    display: flex;
    align-items: center;
    .innet_header_box {
      height: 90%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.005);
      }
      .header_icon {
        padding-top: 5px;
        height: 68%;
        > img {
          height: 100%;
        }
      }
      .header_text {
        display: inline-flex;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 5px;
        cursor: pointer;

        .text_title {
          font-size: 26px;
        }
        .text {
          font-size: 17px;
        }
        .year_tendency {
          font-size: 18px;
          margin-left: 1px;
          padding: 0px 9px;
          border: 2px solid #679bf0;
          background-color: #e3ecfa;
          color: #679bf0;
          border-radius: 16px;
        }
      }
    }
  }
  .innetr_body {
    height: 91%;
    width: 100%;
    background-color: #f9fbfe;
    border-radius: 20px;
    padding: 10px;
    opacity: 1;
    .body_top {
      height: 22%;
      width: 100%;
      // border:2px solid green;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .body_top_left,
      .body_top_right {
        height: 85%;
        width: 45%;
        //   border:1px solid rgb(36, 59, 192);
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        background-image: url(@/assets/images/settle_account/bg_bg.png);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        .left_box {
          height: 70%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .left_icon {
            width: 31%;
            height: 100%;
            > img {
              height: 100%;
              width: 100%;
            }
          }
          .left_text {
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // border:1px solid rgb(36, 59, 192);
            padding: 8px 0px 8px 0px;

            .text_top {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0px 8px;
              .top_text {
                font-size: 20px;
              }
              .top_type {
                font-size: 20px;
                > img {
                  width: 15px;
                  height: 15px;
                }
              }
            }
            .text_bottom {
              display: flex;
              justify-content: flex-start;
              align-items: flex-end;
              gap: 5px;
              .bottom_text {
                font-size: 25px;
              }
              .bottom_type {
                transform: translateY(-4px);
                font-size: 14px;
              }
            }
          }
        }
      }
      .body_top_left {
        background-image: url(@/assets/images/settle_account/background2.png);
      }
      .body_top_right {
        height: 85%;
        width: 45%;
        //   border:1px solid rgb(194, 41, 183);
      }
    }
    .body_middle {
      height: 48%;
      // border:2px solid rgb(208, 47, 170);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .body_middle_tittle {
        height: 10%;
        font-size: 17px;
        font-weight: 600;
        display: flex;
        align-items: center;
      }
      .body_middle_body {
        height: 90%;
        // border:2px solid rgb(208, 47, 170);
      }
    }
    .body_bottom {
      height: 30%;
      // border:2px solid rgb(84, 11, 16);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .body_middle_tittle {
        height: 14%;
        font-size: 17px;
        font-weight: 600;
        display: flex;
        align-items: center;
      }
      .body_middle_body {
        height: 86%;
        // border:2px solid rgb(208, 47, 170);
      }
    }
  }
}

//表头的样式
:deep(.tabelHeaderStyle) {
  .el-table__cell {
    background-color: #d7ecff !important;
    font-weight: bold;
    color: #283859;
  }
}
</style>
