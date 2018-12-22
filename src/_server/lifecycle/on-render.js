import initDatabase from '@database/init'

export default async ({ localeId }) => {
    await initDatabase(localeId)
}
