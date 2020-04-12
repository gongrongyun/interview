// 浅拷贝

function shallowCopy(target) {
  if (!target || typeof target !== "object") return target;

  const result = {};
  for (let atr in target) {
    result[atr] = target[atr];
  }
  return result;
}

shallowCopy({ name: "asd" });

// 深拷贝

function deepCopy(target, map = new Map()) {
  if (!target || typeof target !== "object") return target;

  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);
  // 在这里加上对于其他内置的对象,例如:String, Number之类的

  const result = new target.__proto__.constructor();

  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, result);
  for (let atr in target) {
    result[atr] = deepCopy(target[atr], map);
  }
  return result;
}
