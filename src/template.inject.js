import fs from 'fs-extra';
import path from 'path';
import getDistPath from 'koot/utils/get-dist-path';
import getClientFilePath from 'koot/utils/get-client-file-path';
import getChunkmap from 'koot/utils/get-chunkmap';
// const readFile = require('koot/utils/read-client-file')

import en from './locales/base/en.json';
import ja from './locales/base/ja.json';
import zh from './locales/base/zh.json';

const pathDist = getDistPath();
const manifestLastModified = new Map();
const serviceWorkerPath = new Map();

const noScriptWarningText = (template, { localeId }) => {
    if (!noScriptWarningText._)
        noScriptWarningText._ = {
            en,
            ja,
            zh,
        };

    return noScriptWarningText._[localeId].no_javascript_warning;
};

export default {
    manifest: (template, state) => {
        const localeId = state.localeId;
        const filename = `manifest-${localeId}.json`;
        const { '.public': publicPath } = getChunkmap(localeId);
        if (!manifestLastModified.has(localeId))
            manifestLastModified.set(
                localeId,
                fs
                    .statSync(path.join(pathDist, publicPath, filename))
                    .mtime.valueOf()
            );
        return `<link rel="manifest" href="/${filename}?${
            manifestLastModified.get(localeId) || ''
        }">`;
    },

    svgIcons: `<div class="hide">${__SVG_SYMBOLS__}</div>`,

    definePath: (template, { localeId }) => {
        if (!serviceWorkerPath.has(localeId))
            serviceWorkerPath.set(
                localeId,
                getClientFilePath('service-worker.js', localeId)
            );
        return (
            `<script>` +
            // `window.__CRITICAL_EXTRA_OLD_IE_FILENAME__ = "${getClientFilePath(
            //     'polyfill.js',
            //     state.localeId
            // )}";` +
            `window.__SERVICE_WORKER_FILENAME__ = "${serviceWorkerPath.get(
                localeId
            )}";` +
            `</script>`
        );
    },

    noScriptWarningText,

    htmlClassName: (_, { server: { href } }) => {
        const classes = [];

        const searchParams = new URLSearchParams(new URL(href).search);
        if (searchParams.has('v0')) classes.push('mod-transparent');

        return `class="${classes.join(' ')}"`;
    },
};
