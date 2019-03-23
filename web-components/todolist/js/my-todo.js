const templateTodo = document.createElement('template')

templateTodo.innerHTML = `
    <section>
        <todo-input></todo-input>
        <ul id="list-container"></ul>
    </section>
`

class MyTodo extends HTMLElement {
    constructor() {
        super()
        // initial state
        this._list = [
            { text: 'Learn about Web Components', checked: false }
        ]
    }
    // 当 custom element 首次被插入文档 DOM 时，被调用。
    connectedCallback() {
        this.appendChild(templateTodo.content.cloneNode(true))
        this.$input = this.querySelector('todo-input')
        this.$listContainer = this.querySelector('#list-container')
        // onSubmit 是一个自定义的事件, 1. 判空 2. 注入值 3. 清空
        this.$input.addEventListener('onSubmit', this.addItem)
        this._render()
    }
    // https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
    // 可以不用写 bind 了, 当然 有了 hook 好像也不需要这个特性了
    addItem = e => {
        // e.detail 是由 自定义事件挂载上去的
        this._list = [...this._list, { text: e.detail, checked: false }]
        this._render()
    }

    removeItem = e => {
        // filter 为真返回
        this._list = this._list.filter((item, index) => index !== e.detail)
        this._render()
    }

    toggleItem = e => {
        const item = this._list[e.detail]
        this._list[e.detail] = { ...item, checked: !item.checked }
        this._render()
    }
    // 当 custom element 从文档 DOM 中删除时，被调用。
    disconnectedCallback() { 
        this.$input.removeEventListener('onSubmit', this.addItem)
    }

    _render() {
        if (!this.$listContainer) return
        // 清空列表
        this.$listContainer.innerHTML = ''
        this._list.forEach((item, index) => {
            // 相当于 new 语句，实例化了一个 todo-item 对象
            let $item = document.createElement('todo-item')
            $item.setAttribute('text', item.text)
            // 子组件中使用 set 绑定到其 this 中的 _checked(私有,通过get可以实现) 中, 并可以产生一些副作用
            // 比如刷新页面
            $item.checked = item.checked
            $item.index = index
            $item.addEventListener('onRemove', this.removeItem)
            $item.addEventListener('onToggle', this.toggleItem)
            this.$listContainer.appendChild($item)
        })
    }
}

customElements.define('my-todo', MyTodo)
