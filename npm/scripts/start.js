const { exec, exit } = require('shelljs')
const bs = require("browser-sync").create()

bs.init({
    files: 'dist/**/*.css, dist/**/*.js',
    server: 'src/'
})

bs.watch('src/**/*.scss').on('change', () => {
    exec('npm run build')
    exit(1)
})
