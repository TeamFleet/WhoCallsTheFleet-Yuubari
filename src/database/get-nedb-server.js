export default (dbname, ext = 'nedb') => {
    const thisModule = require(`whocallsthefleet-database/db/${dbname}.${ext}`);

    if (ext === 'json') return thisModule;
    return thisModule.default;
};
