export function formateDate(date, str) {
  if(/(y+)/.test(str)) {
    let year = date.getFullYear() + '';
    // 利用substr 方法 通过固定数字减去匹配到的字符串长度 得出从哪个位置开始截取字符串
    str = str.replace(RegExp.$1, year.substr(4 - RegExp.$1.length));
  }

   let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for(let key in o) {
    if(new RegExp('(' + key + ')').test(str)) {
      let temp = o[key] + '';
      str = str.replace(RegExp.$1, (temp.length === 1) ? lpadLeftZero(temp) : temp);
    }
  }

  return str;
};

function lpadLeftZero(string) {
  return ('00' + string).substr(string.length);
}
