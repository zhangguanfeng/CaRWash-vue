export default {
  // 根据属性去重
  unique (arr, name) {
    const res = new Map();
    return arr.filter((a) => !res.has(a[name]) && res.set(a[name], 1))
  },
}
