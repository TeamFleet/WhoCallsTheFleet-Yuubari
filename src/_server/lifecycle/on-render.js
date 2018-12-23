import initDatabase from '@database/init'
// import kckit from 'kckit'

// console.log('===')

export default async ({ ctx, localeId, store }) => {

    // console.log('\nNew request')
    // console.log(ctx.url)

    // if (localeId === 'en') {
    //     await new Promise(resolve =>
    //         setTimeout(resolve, 2500)
    //     )
    // }

    await initDatabase({ localeId, store })

    // if (localeId === 'en') {
    //     await new Promise(resolve =>
    //         setTimeout(resolve, 2500)
    //     )
    // }

    // console.log(ctx.url + ' | kckit', {
    //     locale: kckit.locale,
    //     sample: kckit.db.ships[20]._name
    // })

}
