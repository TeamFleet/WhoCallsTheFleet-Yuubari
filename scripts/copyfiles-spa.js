// const fs = require('fs-extra')
// const path = require('path')
// const packageJson = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'))

// if (/^yuubari/i.test(packageJson.description)) {
//     // Yuubari channel
//     fs.copySync(
//         path.resolve(process.cwd(), 'public/assets', 'yuubari'),
//         path.resolve(process.cwd(), 'dist-web', 'public')
//     )
// } else {
//     // Stable channel
//     fs.copySync(
//         path.resolve(process.cwd(), 'public/assets', 'stable'),
//         path.resolve(process.cwd(), 'dist-web', 'public')
//     )
// }