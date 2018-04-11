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
        : `<style type="text/css">${getFileContent('critical.css')}</style>`
    )(),

    critical_extra_old_ie_filename: `<script>var __CRITICAL_EXTRA_OLD_IE_FILENAME__ = "${getFile('critical-extra-old-ie.js')}"</script>`,
    // client_filename: `<script>var __CLIENT_FILENAME__ = "${getFile('client.js')}"</script>`,
    // js: (() => ([
    //     getFile('client.js')
    // ]))(),
    // css: [],
    serviceworker_path: __DEV__ ? '' : getServiceWorkerFile(`service-worker.${appName}.js`, distPathname),
    // pwa: __DEV__ ? '' : injectPWA('service-worker.app.js')

    scripts: (() => {
        let html = ''
        const scripts = (__DEV__ ? [] : ['commons.js'])
            .concat(['client.js'])

        if (__DEV__) html += `<script type="text/javascript" src="${getFile('critical.js')}"></script>`
        else html += `<script type="text/javascript">${getFileContent('critical.js')}</script>`

        scripts.forEach(filename => {
            html += `<script type="text/javascript" src="${getFile(filename)}" onerror="onInitError()" defer></script>`
        })

        return html
    })(),
}
