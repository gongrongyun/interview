//  第一点
var str = "global";

function fun() {
  console.log(this.str);
}

fun.call({ str: "local" }); // local

(() => {
  console.log(this.str);
}).call({ str: "local" }); // node:undefined browser:global

// 第二点
var str = "global";
const Obj = {
  str: "local",
  say: () => {
    console.log(this.str);
  }
};
Obj.say(); // node:undefined browser: global
Obj.say.call({ str: "another" }); // node:undefined browser: global

// 第三点
(a => {
  console.log(arguments);
})(1);
