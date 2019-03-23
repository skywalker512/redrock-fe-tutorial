const templateTodoItem = document.createElement('template')

templateTodoItem.innerHTML = `
    <li class="item">
        <input type="checkbox">
        <label></label>
        <button class="destroy">x</button>
    </li>
`

class TodoItem extends HTMLElement {
    constructor() {
        super()
        this._checked = false
        this._text = ''
    }

    connectedCallback() {
        this.appendChild(templateTodoItem.content.cloneNode(true))
        // 这里 this.$item dom 节点与 this 相同
        this.$item = this.querySelector('.item')
        this.$removeButton = this.querySelector('.destroy')
        this.$text = this.querySelector('label')
        this.$checkbox = this.querySelector('input')
        this.$removeButton.addEventListener('click', e => {
            e.preventDefault()
            // 与父节点通信
            this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }))
        })
        this.$checkbox.addEventListener('click', e => {
            e.preventDefault()
            this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }))
        })
        this._render()
    }

    disconnectedCallback() { }
    // 这里的 Attributes 是附着在 html 标签上的 Attributes
    static get observedAttributes() {
        return ['text']
    }

    // attributeChangedCallback(attrName, oldVal, newVal)	属性添加、移除、更新或替换。
    // 解析器创建元素时，或者升级时，也会调用它来获取初始值。
    // Note: 仅 observedAttributes 属性中列出的特性才会收到此回调。
    attributeChangedCallback(name, oldValue, newValue) {
        this._text = newValue
    }
    // 父组件传递到子组件的方法, 并产生副作用的方法，比如刷新页面
    set index(value) {
        this._index = value
    }

    get index() {
        return this._index
    }

    set checked(value) {
        this._checked = value
    }

    get checked() {
        return this.getAttribute('checked')
    }

    _render() {
        if (!this.$item) return
        this.$text.textContent = this._text
        if (this._checked) {
            this.$item.classList.add('completed')
            // this.$checkbox.setAttribute('checked', '')
            // bug 上面的 get checked 拿到的是 this <li> 的 Attribute
            this.setAttribute('checked', true)
        } else {
            this.$item.classList.remove('completed')
            this.setAttribute('checked', false)
        }
    }
}

customElements.define('todo-item', TodoItem)
