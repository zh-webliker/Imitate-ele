export const nowTime = (data) => {
  const time = new Date(data) // data 毫秒数
  return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() +
   '-' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
}
