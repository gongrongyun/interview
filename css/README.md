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