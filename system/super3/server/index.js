import superServer from './run'
import {
    name,
    dir,
    template,
    i18n,
    locales,
    router,
    redux,
    client,
    server,
} from '../../../super'

export default async () =>
    await superServer({
        name,
        dir,
        template,
        i18n,
        locales,
        router,
        redux,
        client,
        server,
    })
