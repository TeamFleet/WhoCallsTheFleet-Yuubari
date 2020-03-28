import LZString from 'lz-string';

export default (dbname, ext = 'nedb') => {
    const thisModule = LZString.decompressFromEncodedURIComponent(
        require(`./db/${dbname}.${ext === 'json' ? 'json-compressed' : ext}`)
            .default
    );

    if (ext === 'json') {
        return JSON.parse(thisModule);
    }

    return thisModule;
};
