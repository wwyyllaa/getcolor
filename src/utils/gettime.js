export default function getCurrentTime() {
    const now = new Date();  // 获取当前时间
    const year = now.getFullYear();  // 获取年份
    const month = (now.getMonth() + 1).toString().padStart(2, '0');  // 获取月份，并在前面补 0
    const day = now.getDate().toString().padStart(2, '0');  // 获取日期，并在前面补 0
    const hours = now.getHours().toString().padStart(2, '0');  // 获取小时，并在前面补 0
    const minutes = now.getMinutes().toString().padStart(2, '0');  // 获取分钟，并在前面补 0
    const timeStr = `${year}-${month}-${day} ${hours}:${minutes}`;  // 拼接时间字符串
    return timeStr;
  }
  