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
