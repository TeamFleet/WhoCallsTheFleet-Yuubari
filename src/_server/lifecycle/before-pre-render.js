import initDatabase from '@database/init';

export default async ({ /*ctx,*/ localeId, store }) => {
    await initDatabase({ localeId, store });
};
