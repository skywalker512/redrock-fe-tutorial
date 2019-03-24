const templateTodo = document.createElement('template')

templateTodo.innerHTML = `
    <section>
        <todo-input></todo-input>
        <ul id="list-container"></ul>
    </section>
    <style>
    h1 {
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
    }

    section {
        background: #fff;
        margin: 30px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }

    #list-container {
        margin: 0;
        padding: 0;
        list-style: none;
        border-top: 1px solid #e6e6e6;
    }
    #new-todo-form {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    #new-todo {
        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #CCC;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
    }
    li.item {
        font-size: 24px;
        display: block;
        position: relative;
        border-bottom: 1px solid #ededed;
    }

    li.item input {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 9px;
        bottom: 0;
        margin: auto 0;
        border: none;
        /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    li.item input:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }

    li.item input:checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }

    li.item label {
        white-space: pre;
        word-break: break-word;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    li.item.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    li.item button,
    li.item input[type="checkbox"] {
        outline: none;
    }

    li.item button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }

    li.item .destroy {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }

    li.item .destroy:hover {
        color: #af5b5e;
    }
    </style>
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
        // open 模式提供了一种我们可以通过JavaScript来访问元素的shadow DOM的方式，
        // {mode: "open"} 这种模式也允许我们通过shadow DOM来访问宿主元素。
        // shadow // shadow 元素
        // shadow.host // 装载 shadow 的元素
        // {mode: "closed"} 
        // shadow -> null
        // 封闭模式不是一种安全的机制。他只是给人一种虚假的安全感。没有人可以阻止其他人修改 Element.prototype.attachShadow()
        const shadow = this.attachShadow({mode: 'open'})
        // 使用 shadow 可以很大层面上阻止最头疼的 css 的继承，但是color background font-family 可以穿过shadow DOM
        // 能否使用 append() 来取代 appendChild() 
        // ParentNode.append() 允许你添加 DOMString 对象；然而 Node.appendChild() 仅仅接受Node对象
        // ParentNode.append() 没有返回值； 然而 Node.appendChild() 返回添加的 Node 对象.
        // ParentNode.append() 可以添加多个节点和字符串；然而 Node.appendChild()只能添加一个 node 节点
        shadow.appendChild(templateTodo.content.cloneNode(true))
        // 有些元素有自己的 shadow 比如 textarea, 所以不能自己添加, 可以通过 Chrome 的右边 3点 > Settings > Elements > Show user agent shadow DOM
        this.$input = shadow.querySelector('todo-input')
        this.$listContainer = shadow.querySelector('#list-container')
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
