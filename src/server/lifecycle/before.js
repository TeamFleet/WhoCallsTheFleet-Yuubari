import { init as dbInit } from '@api/database'

export default async (/*app*/) => {
    await dbInit()
}
