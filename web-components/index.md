## Web Components

**Custom Elements**

类型

* Autonomous custom elements 独立自定义元素
* Customized built-in elements 继承自定义元素

```js
class PopUpInfo extends HTMLElement {
  constructor() {
    super()
  }
}

customElements.define('popup-info', PopUpInfo)
```

```js
class ExpandingList extends HTMLUListElement {
  constructor() {
    super()
  }
}

customElements.define('expanding-list', ExpandingList, { extends: 'ul' })
```

生命周期方法

* **`connectedCallback`** 当 custom element 首次被插入文档 DOM 时，被调用。
* **`disconnectedCallback`** 当 custom element 从文档 DOM 中删除时，被调用。
* **`adoptedCallback`** 当 custom element 被移动到新的文档时，被调用。
* **`attributeChangedCallback`** 当 custom element 增加、删除、修改自身属性时，被调用。
* **`observedAttributes`** 用于声明元素的那些属性需要被监听。

```js
class Square extends HTMLElement {
  constructor() {
    super()
  }
    
  connectedCallback() {
      
  }
    
  disconnectedCallback() {
      
  }
    
  adoptedCallback() {
      
  }
    
  static get observedAttributes() {

  }
    
  attributeChangedCallback(name, oldValue, newValue) {
      
  }
}

customElements.define('custom-square', Square)
```

**Shadow DOM**

封装

可以将 HTML 标签结构、CSS 样式和行为隐藏起来，并从页面上的其他代码中分离开来。它可以将一个隐藏的、独立的 DOM 添加到一个元素上。

```js
class PopUpInfo extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    const p = document.createElement('p')
    const style = document.createElement('style')
    
    style.textContent = `
      .p {
		 color: orange;
		 font-size: 16px;
      }
    `
    
    shadow.appendChild(style)
    shadow.appendChild(p)
  }
}
```

**HTML templates**

模版

**`<template></template>`** 中的代码并不会展示在你的页面中，直到你用 JavaScript 获取它的引用，然后添加到 DOM 中。

插槽 ( 命名插槽 )

```html
<template id="my-paragraph">
   <p>
      <slot name="text-one"></slot>
      <slot name="text-two"></slot>
   </p>
</template>
<my-paragraph>
   <div slot="text-one">
       This is text one.
   </div>
   <div slot="text-two">
       This is text two.
   </div>
</my-paragraph>
```

```js
class PopUpInfo extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    const content = document.getElementById('my-paragraph').content
    const clone = content.cloneNode(true)
    
    shadow.appendChild(clone)
  }
}
```

