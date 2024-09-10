export function setfontSize() {
  // 获取文档宽度
  // const docEl = document.documentElement;
  const clientWidth =
    window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth
  const clientHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  // 未获取到宽度 返回undefined
  //   console.log("clientWidth", clientWidth);
  if (!clientWidth || !clientHeight) return 1

  // 根据文档宽度和设计稿的宽度 获取单位转换比例
  let fontSize
  if (clientWidth / clientHeight >= 21 / 9) {
    fontSize = clientWidth / 1800
  } else {
    fontSize = clientWidth / 1920
  }
  console.log('initSize方法',clientWidth,clientHeight,clientWidth / clientHeight ,clientWidth,fontSize);
  //   console.log("fontSize", fontSize);
  // 返回大小
  return fontSize
}

export function throttle(fn, wait) {
  let inThrottle, lastFn, lastTime
  return function () {
    const context = this,
      args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(
        function () {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args)
            lastTime = Date.now()
          }
        },
        Math.max(wait - (Date.now() - lastTime), 0)
      )
    }
  }
}
