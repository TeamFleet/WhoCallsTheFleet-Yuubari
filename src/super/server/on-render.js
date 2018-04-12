import { updateLocale as dbUpdateLocale } from '@appLogic/database'

export default async (/*obj*/) => {
    if (__DEV__) {
        console.log(' ')
        console.log('[SERVER] onRender')
    }
    dbUpdateLocale()
}
