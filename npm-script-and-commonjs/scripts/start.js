const { exec } = require('shelljs')
const bs = require("browser-sync").create()

const flush = () => exec('npm run build', () => bs.reload())

bs.watch('src/**/*.js').on('change', flush)
bs.watch('src/**/*.scss').on('change', flush)

bs.init({
    server: 'dist/'
})
