# js 篇

## [call、apply、bind](./call-apply-bind.js)

> 考察对于 this 的指向问题与上下文的掌握
>
> > `call(context, arg1, arg2, arg3, ...);`
>
> > `apply(context, [arg1, arg2, arg3, ...]);`
>
> > `bind(context, arg1, arg2, arg3, ...);`

## [new 操作符干了什么](./new.js)

> 第一步：创建一个对象  
> 第二步：将创建的对象的原型与构造函数的原型链接  
> 第三步：执行构造函数  
> 第四步：返回对象

## 事件委托与事件冒泡(捕获)

> ### 事件委托
>
> > 事件委托是指子元素将事件响应函数挂在父节点上，以此来达到减少监听的消耗。例如现有一列子元素 `items`，当点击一个 `item` 时触发相应的函数。如果直接将监听函数挂在 `item` 上，那么有多少个 `item` 就要有多少个监听事件，这样会极大的增加消耗，而如果将监听函数挂在父节点上，则只需要一个监听函数，这样可以有效地减少负荷。
>
> ### 事件冒泡(捕获)
>
> > 在界面上产生的一个事件，通常是先经过时间捕获，之后再进行事件冒泡。事件捕获阶段是从父节点向子节点传递，直到传递到目标节点，在目标节点接收到事件之后，再由子节点向父节点进行冒泡，在捕获与冒泡阶段都可手动进行阻止。

## Promise

> ### resolve 或 reject 的参数为另一个 Promise
>
> > ```js
> > const p1 = new Promise((resolve, reject) => {
> >   setTimeout(() => reject(new Error("fail"), 3000));
> > });
> >
> > const p2 = new Promise((resolve, reject) => {
> >   setTimeout(() => resolve(p1), 1000);
> > });
> > p2.then(result => console.log(result)).catch(error => console.log(error));
> > // error: fail
> > ```
> >
> > 上面代码中，`p1` 是一个 `Promise`，3 秒之后变为 `rejected`。`p2` 的状态在 1 秒之后改变，`resolve` 方法返回的是 `p1`。由于 `p2` 返回的是另一个 `Promise`，导致 `p2` 自己的状态无效了，由 `p1` 的状态决定 `p2` 的状态。所以，后面的 `then` 语句都变成针对后者（`p1`）。又过了 2 秒，`p1` 变为 `rejected`，导致触发 `catch` 方法指定的回调函数。
>
> ### then 与 catch 方法
>
> > 1. `Promise.then()` 方法会返回一个新的 `Promise` 便于达到链式调用的效果。
> > 2. `Promise.catch()` 方法等价于 `then(null, reject)`或 `then(undefined, reject)`。
> > 3. `Promise` 对象的错误具有冒泡性质，会一直向后传递，直到被捕获，所以我们可以在链式调用的最后使用 `catch` 方法捕捉到前面所有抛出的错误。
>
> ### finally
>
> > 调用 `finally` 方法会在 `Promise` 状态确定后不管是 `reject` 还是 `fulfilled` 都执行。
>
> ### race、all 与 any 方法
>
> > 1. `Promise.race()` 方法会接受一个数组的 `Promise` 对象作为参数，包装成一个 `Promise` 实例．只要数组中的一个实例改变状态，那么 `race` 的状态也会改变，那个率先改变的实例的返回值，就传递给 `race` 的回调函数
> > 2. `Promise.all()` 方法会接受一个数组的 `Promise` 对象作为参数，并包装成一个 `Promise` 实例，当数组中所有的实例的状态改变为 `fulfilled` 时， `all` 的状态才会变为 `fulfilled` ，并且所有实例的返回值会以一个数组的形式传递给 `all` 的回调函数．当有一个实例的状态为 `rejected` 时， `all` 的状态就会变为 `rejected` ,　它的返回值也会传递给 `all` 的回调函数．
> > 3. `Promise.any()` 方法也是接受一个数组的 `Promise` 对象作为参数，并包装成一个 `Promise` 实例，　当数组中任意一个实例的状态发生改变，那么 `Promise.any()` 的状态也会改变成相应的状态，该实例的返回值也会传递给 `any` 的回调函数．
>
> ### Promise.resolve()　 Promise.reject() Promise.try()
>
> > 1. `Promise.resolve()` 方法将现有的对象转换成为 `Promise` 对象，它等价于以下写法
> >
> > ```js
> > Promise.resolve("test");
> > // 等价于下面
> > new Promise(resolve => resolve("test"));
> > ```
> >
> > 2. `Promise.reject()` 同上，它等价于以下写法
> >
> > ```js
> > Promise.reject("test");
> > //等价于下面
> > new Promise(reject => reject("test"));
> > ```
> >
> > 3. `Promise.try()` 方法为所有的操作提供了统一的处理机制，不管是同步还是异步，都可按照 `Promise` 的方法管理，使用方法如下
> >
> > ```js
> >   Promise.try(() => {/* 同步或者异步 */}).then(...).catch(...)
> > ```
> >
> > 以上就是 `Promise` 的相关方法

## [数组的扁平化](./flat.js)

> ### flat 原生方法
>
> ### reduce + concat + isArray + 递归
>
> ### forEach + isArray + push + 递归
>
> ### 使用栈

## 作用域与闭包

> ### 函数作用域与全局作用域
>
> > 需要注意的是在非严格模式下，在当前作用域及沿着作用域向上查找都找不到目标变量时，左查询会在全局作用域下声明一个同名变量并返回给查询者，但是右查询会报错，在严格模式下，两者都会报错．左查询一般出现在变量的赋值，有查询一般出现在变量的引用．
>
> ### 块级作用域(let, const)
>
> > 经典的 for 循环问题  
> > 修改作用域的方法有 `with` 和 `eval` 方法
>
> ### 闭包
>
> > 1. 什么是闭包：由于函数作用域在函数执行完后会被清理回收，但是由于闭包是建立在函数内部的一个子函数，可访问外部作用域，即使上级函数执行完，只要子函数还会可能会被引用，那么作用域也不会销毁，此时这个子函数就是闭包，它就有权限访问上级作用域中的变量．
> > 2. 闭包解决了什么问题：闭包解决了外部作用域不能访问内部作用域的问题，将函数的内外连接起来
> > 3. 闭包有哪些应用场景：回调函数

## [this 指向](./this.js)

> ### 普通函数与箭头函数
>
> > 1. 普通函数会有自己的 `this` ，而箭头函数不会
> > 2. 箭头函数继承而来的 `this`　永远不会改变，即使调用它的对象发生了改变．
> > 3. 箭头函数没有 `arguments` 参数，也没有原型 `prototype`

## [原型与原型链](./prototype.js)

> ### 对于原型链要注意以下几条
>
> 1. 原型链的尽头是 `Object.prototype` ，所有对象都从 `Object.prototype` 继承属性
> 2. `Function.prototype` 和 `Function.__proto__` 是统一对象．即 `Object | Array | Number` 等构造函数均继承于 `Function.prototype` ．
> 3. `Function.prototype` 继承于 `Object.prototype` .
> 4. `Function.prototype` 是个不同于一般函数（对象）的函数（对象）
>    > - `Function.prototype` 可以像普通函数一样调用，但是总是返回 `undefined` ．
>    > - 普通函数实际上是 `Function.prototype` 的实例，即普通函数继承于 `Function.prototype` ， `fun.__proto__ === Function.prototype` ．
>    > - `Function.prototype` 继承于 `Object.prototype` ，并且没有 `prototype` 属性．`func.prototype` 是普通对象，`Function.prototype.prototype` 是 `null` ．
>    > - 所以 `Function.prototype` 是个特殊的函数，可以独立于／优先于 `Function` 产生
> 5. `Object` 本身是一个构造函数，是 `Function` 的实例，即 `Object.__proto__ === Function.prototype` ．
>
> ### 最后总结：先有 `Object.prototype` ， `Function.prototype` 继承 `Object.prototype` 而产生，最后， `Object` 和 `Function` 和其它构造函数继承 `Function.prototype` 而产生．

## 跨域的三种解决方案

> ### jsonp
>
> > 利用 `script` 没有跨域限制的特点，在文件中插入 `<script>` 标签，其 `src` 指向后端路由，而后再写一个全局的处理函数，后端会返回一个函数执行的字符串，函数参数即为所需要的数据，返回至前端即会立即执行函数，就达到了跨域的效果．**需要注意的是这种方法只能支持 `get` 方法**
>
> ### proxy
>
> > 跨域问题由浏览器的同源策略导致，那么另外一个方法就是走代理，通过服务器代理，就可以实现跨域了．也就是说，前端在发送请求的时候，并不是直接发送到目标后端，而是发送到同源的中间服务器，再由中间服务器发送请求到目标后端，再将请求到的数据返回给前端，这样就是代理的整个流程．
>
> ### cors
>
> > 该方法的全称为＂跨域资源共享＂，是 W3C 的一个标准，需要浏览器与服务端都支持，它要做的仅仅只是在后端响应时在相应头中增加 `Access-Control-Allow-Origin` 字段，当然也可以将其他字段都加上，但是只加这一个字段也能实现跨域．
>
> 其余的 `iframe` 方法就不总结了

## [event loop](./eventloop.js)

> ### browser 环境
>
> > js 在执行时会先执行主代码块，如果遇到异步操作，则会把异步函数放进任务队列，在主代码块执行完后，就会从任务队列中取出一个任务拿到主线程来执行，直到任务队列中的任务执行完毕。这个就称之为 `event loop` 。而任务又分为宏任务与微任务：
> >
> > > - 宏任务一般是：script，setTimeout，setInterval，setImmediate
> > > - 微任务一般是：原生 Promise，process.nextTick
>
> ### node 环境
>
> > 在 `node` 环境中，提供了 `setImmediate` 与 `process.nextTick` 两个与任务队列相关的函数，其中 `process.nextTick` 函数会在主代码块执行完且事件循环结束前触发，而 `setImmediate` 函数会在本次时间循环结束，下次 `event loop` 前触发．因 `setTimeout` 与 `setImmediate` 的性质导致直接在主代码块中执行这两个函数的结果并不确定．

## 前端缓存

> ### 浏览器请求资源过程如下
>
> - `Service Worker`：区别于内存跟硬盘的单独存储空间（`Application->Cache Storage`），并且可自己操控，在发送网络请求时首先会来这里进行查找
> - `Memory Cache`：当在 `Service Worker` 中没有命中时，会在这里进行查找。`memory cache` 是内存中的存储，但是是个短暂的存储，当浏览器 TAB 关闭时便会失效，**几乎所有资源都**都会进入`memory cache` ，所以如果的确想要不进入`memory cache` 的话可以使用`no-store` 字段
> - Disk Cache：当在`memory cache`中也没有找到时，会进入`disk cache`查找。`disk cache`是硬盘中的存储，可以长久存储。在这里又分为两种情况：
>   > - 强制缓存：通过`Cache control`和`Expries`字段来影响强制缓存,使用强制缓存时不会请求服务器，当缓存未失效时状态码为 200，当强制缓存失效时，会进入下面的协商缓存
>   > - 协商缓存：使用协商缓存时，浏览器会先请求缓存数据库，如果返回状态码为 304 则表示继续使用。通过`Last-Modified & If-Modified-Since`和`Etag & If-None-Match`可影响协商缓存
> - 网络请求：这是最后一步，也是最为常见的一步，等待网络响应，而后一步一步向上存进相应的存储区域中

## 隐式类型转换

> ### ToPrimitive
>
> > 该方法将对象转化为原始值，并且接收一个类型参数，表明想要转换的类型，改参数有以下三种情况
> >
> > - 类型为 Number：首先会调用 `valueOf()` 方法，如果得到的不是原始值，则会继续调用 `toString()` 方法，如果返回值是原始值则返回，否则报错
> > - 类型为 String：首先会调用 `toString()` 方法，如果的到的不是原始值，则会继续调用 `valueOf()` 方法，如果返回值是原始值则返回，否则报错
> > - 未指定类型：若接收对象为 `Date` ，那么类型将指定为 `String` ，否则被指定为 `Number`
>
> ### valueOf
>
> > js 中常见的内置对象有：`Date Array Number Boolean String RegExp Function` 等，对于不同的对象返回的值是不一样的，分以下三种情况：
> >
> > - `Number String Boolean` 这三种构造函数产生的对象，通过 `valueOf()` 方法后会返回其原始值
> > - `Date` 这种特殊对象，会将日期转换为日期的时间戳
> > - 除以上的都会返回`this`，即对象自身
>
> ### toString
>
> > 很多对象都封装了自己的`toString()` 方法，例如下面
> >
> > ```js
> > Number.prototype.hasOwnProperty("toString"); // true
> > Boolean.prototype.hasOwnProperty("toString"); // true
> > String.prototype.hasOwnProperty("toString"); // true
> > Array.prototype.hasOwnProperty("toString"); // true
> > Date.prototype.hasOwnProperty("toString"); // true
> > RegExp.prototype.hasOwnProperty("toString"); // true
> > Function.prototype.hasOwnProperty("toString"); // true
> >
> > var num = new Number("123sd");
> > num.toString(); // 'NaN'
> >
> > var str = new String("12df");
> > str.toString(); // '12df'
> >
> > var bool = new Boolean("fd");
> > bool.toString(); // 'true'
> >
> > var arr = new Array(1, 2);
> > arr.toString(); // '1,2'
> >
> > var d = new Date();
> > d.toString(); // "Wed Oct 11 2017 08:00:00 GMT+0800 (中国标准时间)"
> >
> > var func = function() {};
> > func.toString(); // "function () {}"
> > ```
> >
> > 除这些外，其他对象都是返回该对象的类型
>
> ### ==运算符
>
> > - `null` 与 `udefined` 相等
> > - 当`String Number Boolean`这三种类型之间相互比较时，若两边类型相同则直接比较，否则全都转换成`Number`进行比较
> > - 当等号两边一方为`Object`时，则对该对象使用`ToPrimtive`方法再进行比较

## 防抖节流

> ### [防抖](./debounce.html)
>
> > 防抖，顾名思义是指在提交表单等场合时，为了防止用户点击多次。在延迟时间内不管触发多少次，只执行最后一次。应用场景：支付等
>
> ### [节流](./throttle.html)
>
> > 节流，顾名思义是指在事件多次被触发时，将多次请求合为一次，每隔一段时间发送一次请求，达到减少请求次数的效果。应用场景：实时查询等。
