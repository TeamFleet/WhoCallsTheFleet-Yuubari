const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
// const md5 = require('md5');

module.exports = (localeId) => {
    const folder = path.resolve(__dirname, '../../logs/locales');
    fs.ensureDirSync(folder);

    const locales = glob
        .sync(`**/${localeId}.json`, {
            cwd: __dirname,
            absolute: true,
        })
        .reduce(
            (locales, file) => ({
                ...locales,
                ...fs.readJsonSync(file),
            }),
            {}
        );

    locales.home_page_markdown = fs.readFileSync(
        path.resolve(__dirname, '../../docs/updates/1.0.0', `${localeId}.md`),
        'utf-8'
    );

    const file = path.resolve(folder, `${localeId}.json`);

    fs.writeJsonSync(file, locales, {
        spaces: 4,
    });

    return file;
};
