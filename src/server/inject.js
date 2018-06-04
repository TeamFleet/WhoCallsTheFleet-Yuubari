import fs from 'fs-extra'
import path from 'path'
import { localeId } from 'super-project/i18n'
import dirs from '../directories'

const rootPath = path.resolve(process.env.SUPER_DIST_DIR, './public')

const getClientFilePath = require('super-project/utils/get-client-file-path')
// const readFile = require('super-project/utils/read-client-file')

const manifestLastModified = {}
const svgIcons = (() => {
    const content = fs.readFileSync(
        path.resolve(dirs.assets, './symbols/symbol-defs.svg'),
        'utf8'
    )
        .replace(/<title>(.+?)<\/title>/g, '')
        .replace(/\n/g, '')

    return `<div class="hide">${content}</div>`
        + (__DEV__ ? `<script>var __ICONSVG__ = \`${content}\`</script>` : '')
})()
const definePath = `<script>`
    + `window.__CRITICAL_EXTRA_OLD_IE_FILENAME__ = "${getClientFilePath('polyfill.js')}";`
    + `window.__SERVICE_WORKER_FILENAME__ = "${getClientFilePath('service-worker.js')}";`
    + `</script>`

export default {
    manifest: () => {
        const filename = `manifest-${localeId}.json`
        if (!manifestLastModified[localeId])
            manifestLastModified[localeId] = fs.statSync(path.join(rootPath, filename)).mtime.valueOf()
        return `<link rel="manifest" href="/${filename}?${manifestLastModified[localeId] || ''}">`
    },

    svgIcons,
    definePath,
}
