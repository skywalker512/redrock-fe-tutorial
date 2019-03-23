## Web Components

**Custom Elements**

类型

* Autonomous custom elements 独立自定义元素
* Customized built-in elements 继承自定义元素

生命周期方法

* **`connectedCallback`** 当 custom element 首次被插入文档 DOM 时，被调用。
* **`disconnectedCallback`** 当 custom element 从文档 DOM 中删除时，被调用。
* **`adoptedCallback`** 当 custom element 被移动到新的文档时，被调用。
* **`attributeChangedCallback`** 当 custom element 增加、删除、修改自身属性时，被调用。
* **`observedAttributes`** 用于声明元素的那些属性需要被监听。

**Shadow DOM**

封装

可以将 HTML 标签结构、CSS 样式和行为隐藏起来，并从页面上的其他代码中分离开来。它可以将一个隐藏的、独立的 DOM 添加到一个元素上。

**HTML templates**

模版

**`<template></template>`** 中的代码并不会展示在你的页面中，直到你用 JavaScript 获取它的引用，然后添加 DOM 中。

插槽 ( 命名插槽 )

