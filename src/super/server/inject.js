import fs from 'fs-extra'
import path from 'path'

import { localeId as currentLocaleId } from 'sp-i18n'
// import isomorphicUtils from 'sp-isomorphic-utils'
// import getServiceWorkerFile from 'sp-pwa/get-service-worker-file'

const dirs = require('../../directories')

const rootPath = path.resolve(__DIST__, './public')

const getFilePath = require('../../../system/super3/utils/get-client-file-path')
const readFile = require('../../../system/super3/utils/read-client-file')

export default {
    htmlattr: () => ` data-locale="${currentLocaleId}" lang="${currentLocaleId}"`,
    manifest: () => {
        const filename = `manifest-${currentLocaleId}.json`
        const { mtime } = __DEV__ ? '' : fs.statSync(path.join(rootPath, filename))
        return `<link rel="manifest" href="/${filename}?${mtime ? mtime.valueOf() : ''}">`
    },
    svg_symbols: (() => {
        const content = fs.readFileSync(
            path.resolve(dirs.assets, './symbols/symbol-defs.svg'),
            'utf8'
        )
            .replace(/<title>(.+?)<\/title>/g, '')
            .replace(/\n/g, '')

        return `<div class="hide">${content}</div>`
            + (__DEV__ ? `<script>var __ICONSVG__ = \`${content}\`</script>` : '')
    }),

    critical_css: (() => __DEV__
        ? ''
        : `<style type="text/css">${readFile('critical.css')}</style>`
    )(),

    critical_extra_old_ie_filename: `<script>var __CRITICAL_EXTRA_OLD_IE_FILENAME__ = "${getFilePath('critical-extra-old-ie.js')}"</script>`,
    // client_filename: `<script>var __CLIENT_FILENAME__ = "${getFile('client.js')}"</script>`,
    // js: (() => ([
    //     getFile('client.js')
    // ]))(),
    // css: [],

    // serviceworker_path: __DEV__ ? '' : getServiceWorkerFile(`service-worker.${appName}.js`, distPathname),

    serviceworker_path: '',
    // pwa: __DEV__ ? '' : injectPWA('service-worker.app.js')

    scripts: (() => {
        let html = ''
        const scripts = (__DEV__ ? [] : ['commons.js'])
            .concat(['client.js'])

        if (__DEV__) html += `<script type="text/javascript" src="${getFilePath('critical.js')}"></script>`
        else html += `<script type="text/javascript">${readFile('critical.js')}</script>`

        scripts.forEach(filename => {
            html += `<script type="text/javascript" src="${getFilePath(filename)}" onerror="onInitError()" defer></script>`
        })

        return html
    })(),
}
