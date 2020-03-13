// browser

setTimeout(() => console.log("4"), 0);

new Promise(() => {
  console.log("1");
}).then(() => {
  console.log("3");
});

console.log("2");

// node

setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));
// 多次执行结果并不确定

setImmediate(() => console.log("3"));

process.nextTick(() => console.log("2"));

console.log("1");
