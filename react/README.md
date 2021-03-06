## vitrul dom && diff && fiber

> ### 虚拟 DOM
>
> > 要了解虚拟 DOM 就要先了解浏览器渲染页面的流程：首先 html 解析器会先将 html 解析并生成一颗 DOM 树，接着 CSS 解析器会将 CSS 解析并加到 DOM 树上去合并成一颗渲染树，然后进行布局，最后渲染出来。每一次的 DOM 操作都会让浏览器重新执行一遍上面的流程，这会导致网页性能下降。
> >
> > 虚拟 DOM 被提出来改善这个问题，它是使用 JS 对象来代表真实的 DOM。一般会经历以下几个步骤：
> >
> > > - 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
> > > - 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
> > > - 把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了
> >
> > 以上操作流程为 render->diff->patch->render。在 React 中，开发者几乎不会亲自操作虚拟 DOM。
>
> ### diff
>
> > 在比较两颗虚拟 DOM 树的时候，正常时间复杂度为Ｏ(n^3)，但是在 React 中有两条假设，将复杂度降至Ｏ(n)的复杂度:
> >
> > > - 比较时只会在同层级比较，并且相同组件会产生类似的 DOM 结构，不同的组件产生不同的 DOM 结构，就不会继续向下进行比较，而是直接创建一个新的对象
> > > - 对于同一层次的一组子节点，它们可以通过唯一的 key 进行区分。
>
> ### fiber
>
> > React 的更新过程是一个同步的过程，如果某次更新时间较长，那么浏览器就无法去做其它的事情，用户得不到任何反馈，造成所谓的页面卡顿，用户体验不好。  
> > Fiber 的方式就是分片，类似于计算机操作系统中的时间片轮转，将更新分片，每次只执行一个分片，执行完一个分片后给其它任务执行的机会，这样就不会是页面更新独占进程。  
> > 维护每一个分片的数据结构就是 Fiber。
