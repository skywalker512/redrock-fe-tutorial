const templateTodoInput = document.createElement('template')

templateTodoInput.innerHTML = `
    <form id="new-todo-form">
        <input id="new-todo" type="text" placeholder="What needs to be done?">
    </form>
`

class TodoInput extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        console.log('TodoInput ADDED TO THE DOM')
        this.appendChild(templateTodoInput.content.cloneNode(true))
        this.$form = this.querySelector('form')
        this.$input = this.querySelector('input')
        this.$form.addEventListener("submit", (e) => {
            e.preventDefault()
            if (!this.$input.value) return
            this.dispatchEvent(new CustomEvent('onSubmit', { detail: this.$input.value }))
            this.$input.value = ''
        })
    }

    disconnectedCallback() {
        console.log('TodoInput REMOVED TO THE DOM')
    }
}

customElements.define('todo-input', TodoInput)
