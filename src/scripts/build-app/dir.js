const path = require('path')

const pathRoot = path.resolve(__dirname, '../../')
const pathPics = path.resolve(pathRoot, './dist-web/public/app/_pics')
// const pathPackage = path.resolve(pathRoot, `../${dirPackage}/src`)
const pathPackage = path.resolve(pathRoot, `./dist-package/src`)

module.exports = {
    pathRoot,
    pathPics,
    pathPackage,
    pathPackageJSON: path.resolve(pathPackage, 'package.json'),
    pathPackageAssets: path.resolve(pathPackage, 'assets'),
    pathPackageOut: path.resolve(pathPackage, `../out`)
}