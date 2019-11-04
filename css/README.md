# CSS篇
## [盒模型](./boxModel.html)
>margin + border + padding + content
>>W3C盒子：width = content
>
>>IE盒子：width = content + border + padding
>
>> 使用box-sizing属性实现转换，content-box为W3C，border-box为IE
## [BFC](./bfc.html)
>块级格式上下文
>>作用：
>> - 清除浮动带来的影响
>> - 两个区域的margin重合
>> - 浮动子元素超出父元素的区域 
## 元素选择器
> - **#** id选择器
> - **.** 类选择器
> - **>** 子代选择器（仅后一代元素）
> - **+** 相邻选择器
> - **div** 标签选择器
> - **空格** 后代选择器（后代所有元素）
> - **\*** 通配符选择器（所有元素）
> - **[attr=value]** 属性选择器
> - **:** 伪类选择器
> - ……
## [div居中](./center.html)
> 水平居中
>> - margin: 0 auto
>> - left: 50%; margin: -(自身宽度)px (已知自身宽度)
>> - left: 50%; translateX(-50%) (未知自身高度)
>> - flex: justity-content: center
>
> 垂直居中
>> - top: 0; bottom: 0; margin-top: -50%; (未知高度)
>> - top: 50%; translateY(-50%) (未知自身高度)
>> - top: 50%; margin-top: -50px (已知自身高度)
>> - flex justify-content: center