export default {
  /**
   * @description: 保留两位小数(处理特殊情况)
   * @param {Number} num 需要处理的数字
   * @param {Boolean} isHaveZero 是否需要保留0
   * @return {Number} 返回处理后的数字
   * */
  keepTwoDecimal(num, isHaveZero = false) {
    if (Number.isNaN(num)) return
    if (isHaveZero) return num.toFixed(2)
    const roundedNumber = Math.round(parseFloat(num) * 100) / 100
    return Number.isInteger(roundedNumber) ? roundedNumber : roundedNumber.toFixed(2)
  },
  /**
   * @description: 处理数据(处理特殊情况)
   * @param {Number} val 需要处理的数字
   * @param {Boolean} isPercent 是否需要转化为百分数
   * @param {Boolean} isHaveZero 是否需要保留0
   * @param {Boolean} isHavePercent 是否需要保留百分号
   * @return {string} 返回处理后的数字
   * */
  handleData(val, isPercent = false, isHaveZero = false, isHavePercent = true) {
    if (val === 0) {
      return isHaveZero ? '0.00%' : 0
    }
    if (!val) {
      return '--'
    }
    if (isPercent) {
      const formattedValue = this.keepTwoDecimal(val * 100, isHaveZero)
      return isHavePercent ? `${formattedValue}%` : formattedValue
    }
    return val
  }
}
