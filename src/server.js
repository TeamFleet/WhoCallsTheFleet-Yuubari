import superServer from '../system/super3/server'
import {
    name,
    dir,
    dist,
    template,
    i18n,
    locales,
    router,
    redux,
    client,
    server,
} from '../super'

export default async () =>
    await superServer({
        name,
        dir,
        dist,
        template,
        i18n,
        locales,
        router,
        redux,
        client,
        server,
    })
