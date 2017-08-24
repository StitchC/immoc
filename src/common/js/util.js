/**
* 解析url 参数
* example: ?id=123456&a=abcabc
* return: {id: 123456, a: abcabc}
**/
export function urlParse() {
  let url = window.location.search;
  let reg = /[?&][^?&]+=[^?&]+/g;
  let args = url.match(reg); // ['?id=123456', 'a=abcabc']
  let obj = {};

  if(args) {
    args.forEach((item) => {
      let tempArr = item.substring(1).split('='); // ['id', '123456'], ['a', 'abcabc']
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }

  return obj;
}
