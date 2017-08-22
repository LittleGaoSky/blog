function formatDate(date, fmt) {
  // 如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
  if (/(y+)/.test(fmt)) {
    // RegExp.$1匹配到/(y+)/括号里面的值
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let key in o) {
    if (new RegExp(`(${key})`).test(fmt)) {
      let str = o[key] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : leftZero(str));
    }
  }
  return fmt;
};

function leftZero(str) {
  // str.length=1:009->09, str.length=2:0012->12
  return ('00' + str).substr(str.length);
}
