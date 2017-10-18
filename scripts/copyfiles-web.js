const fs = require('fs-extra')
const path = require('path')
// const packageJson = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'))

if (require(path.resolve(process.cwd(), 'utils/get-channel'))()) {
    // Yuubari channel
    fs.copySync(
        path.resolve(process.cwd(), 'assets/public', 'yuubari'),
        path.resolve(process.cwd(), 'dist-web', 'public')
    )
} else {
    // Stable channel
    fs.copySync(
        path.resolve(process.cwd(), 'assets/public', 'stable'),
        path.resolve(process.cwd(), 'dist-web', 'public')
    )
}