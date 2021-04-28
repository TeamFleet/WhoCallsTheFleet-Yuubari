global.KOOT_DIST_DIR = __dirname;

const run = async () => {
    require('./server');
};

run().catch(err => console.error(err));
