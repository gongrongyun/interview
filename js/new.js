const New = () => {
  // 创建新对象
  let obj = new Object();

  // 获取对象构造函数，并除去第一个参数
  const _Con = [].shift.call(arguments);

  // 将新创建的对象的原型指向构造函数的原型
  obj._proto_ = _Con.prototype;

  // 执行构造函数
  const retObj = _Con.apply(obj, arguments);

  // 返回构造函数返回的对象或者新创建的对象
  return typeof retObj === "object" ? reobj : obj;
};
