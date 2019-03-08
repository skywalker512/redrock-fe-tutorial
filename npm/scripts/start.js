const { exec } = require('shelljs')
const bs = require("browser-sync").create()

bs.watch('src/**/*.scss').on('change', () => {
    exec('npm run build', () => {
        bs.reload()
    })
})

bs.init({
    server: 'dist/'
})
