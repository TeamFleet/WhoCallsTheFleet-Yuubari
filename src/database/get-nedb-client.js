import LZString from 'lz-string';

export default dbname =>
    LZString.decompressFromEncodedURIComponent(
        require(`./db/${dbname}.nedb`).default
    );
