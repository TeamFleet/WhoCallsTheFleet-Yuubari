import { updateLocale as dbUpdateLocale } from '@database'

export default async ({ store }) => {
    await dbUpdateLocale({ store })
}
