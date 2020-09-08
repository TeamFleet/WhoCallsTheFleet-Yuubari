const fs = require('fs-extra');
const path = require('path');
const glob = require('glob-promise');

(async () => {
    const cwd = path.resolve(
        __dirname,
        '../../Ooyodo/.fetched_data/pics/equipments'
    );
    const to = path.resolve(__dirname, '../src/assets/fairies');

    const filenames = await glob('**/item_character.png', {
        cwd,
    });
    const ids = filenames
        .map((filename) => parseInt(filename.replace(/^([0-9]+).+$/, '$1')))
        .sort((a, b) => a - b);
    const files = filenames.map((filename) => path.resolve(cwd, filename));

    let index = 0;
    for (const file of files) {
        await fs.copyFile(file, path.resolve(to, `${ids[index]}.png`));
        index++;
    }
})();
