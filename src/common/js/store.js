/**
 * 写入和读取localstorage 方法
 *
 *
  **/
export function saveToLocal(id, key, val) {
  let seller = window.localStorage.__seller__;

  // 如果没有 localStorage.__seller__ 这个对象 创建一个
  if(!seller) {
    seller = {};
    seller[id] = {};
  }else {
    // 如果有就直接给这个对象添加一个key
    // localstorage 会是一个json 字符串所以需要解析
    seller = JSON.parse(seller);
    if(!seller[id]) {
      // 如果seller 不存当前的这个id 就新建一个
      seller[id] = {};
    }
  }
  // 最后为新建的数据对象赋值
  seller[id][key] = val;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function getFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;

  // 首先判断 localstorage.__seller__ 是否存在
  if(seller) {
    // 如果浏览器的 __seller__ 存在 将其解析
    seller = JSON.parse(window.localStorage.__seller__);
    // 通过url 中的商家id 获取localstorage 中对应id 的数据
    let obj = seller[id];
    if(!obj) {
      // 如果获取不了 返回默认值
      return def;
    } else {
      // 否则返回对应的数据
      return seller[id][key];
    }
  }else {
    // 如果不存在 返回默认值
    return def;
  }
}
