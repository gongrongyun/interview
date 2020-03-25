# CSS 篇

## [盒模型](./boxModel.html)

> margin + border + padding + content
>
> > W3C 盒子：width = content
>
> > IE 盒子：width = content + border + padding
>
> > 使用 box-sizing 属性实现转换，content-box 为 W3C，border-box 为 IE

## [BFC](./bfc.html)

> 块级格式上下文
>
> > 特性：
> >
> > - BFC 可以包含浮动的元素（清除浮动）
> > - 同一个 BFC 下外边距会发生重合
> > - BFC 可以防止元素被浮动元素覆盖

## 元素选择器

> - **#** id 选择器
> - **.** 类选择器
> - **>** 子代选择器（仅后一代元素）
> - **+** 相邻选择器
> - **div** 标签选择器
> - **空格** 后代选择器（后代所有元素）
> - **\*** 通配符选择器（所有元素）
> - **[attr=value]** 属性选择器
> - **:** 伪类选择器
> - ……

## [div 居中](./center.html)

> 水平居中
>
> > - margin: 0 auto
> > - left: 50%; margin-left: -(自身宽度一半)px (已知自身宽度)
> > - left: 50%; translateX(-50%) (未知自身高度)
> > - flex: justity-content: center
>
> 垂直居中
>
> > - top: 0; bottom: 0; margin-top: -50%; (未知高度)
> > - top: 50%; translateY(-50%) (未知自身高度)
> > - top: 50%; margin-top: -(自身高度一半)px (已知自身高度)
> > - flex justify-content: center

## [relative 与 absolute](./position.html)

> relative（相对定位）:
>
> > 如果没有父级，则以 body 的原点为原点来计算。如果有父级则按照父级的原点来计算原点
>
> absolute（绝对定位）:
>
> > 如果父级设置了 position，则以父级的原点来计算原点。如果父级没有设置 position，且设置了 top、left 等，则按照浏览器(不是 body)的原点来计算

## [CSS 制作三角形](./triangle.html)

> - border 实现
> - clip-path 实现

## display、visibility、opacity

> - `display: none` 会将元素从文档中除去，这会导致文档的重排与重绘，而且绑定事件也会失效。
> - `visibility: hidden` 不会将元素从文档中除去，但是相当于元素透明，不会导致页面的重排，但是会导致重绘，并且绑定事件也会失效。
> - `opacity: 0` 只是将元素的透明度调为 0,不会导致页面的重排，甚至可能不会导致重绘，并且绑定的事件还有效
