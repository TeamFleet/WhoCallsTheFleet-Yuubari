import { updateLocale as dbUpdateLocale } from '@appLogic/database'

export default async (/*obj*/) => {
    await dbUpdateLocale()
}
