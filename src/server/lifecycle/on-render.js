import { updateLocale as dbUpdateLocale } from '@api/database'

export default async (/*obj*/) => {
    await dbUpdateLocale()
}
