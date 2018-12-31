import metas from 'metas'
import { getStore } from 'koot'

// import { origin as siteOrigin } from '@appConfig/site.js'
// import { availableLocalesFb } from '@appConfig/i18n.js'

import { update as updatePageTitle } from '@api/page-title/api.js'

const htmlHead = (state, infos) => {

    if (typeof state === 'object' && typeof infos === 'undefined') {
        return htmlHead(getStore().getState(), state)
    }

    if (typeof state !== 'object') return {}

    const localeId = state.localeId
    const siteName = __('title') + (__DEV__ ? ' (DEV)' : '')
    let origin = state.server.origin

    let {
        uri = typeof location !== 'undefined' ? location.pathname : undefined,
        title = siteName,
        subtitle,
        description,
        image
    } = Object.assign({
        uri: '',
        "twitter:card": "summary_large_image",
    }, infos)

    if (typeof uri === 'object') {
        uri = uri.pathname
        // const pathname = uri.pathname
        // const query = uri.query || {}
        // fb_locale = query.fb_locale
    }
    if (uri.substr(0, 1) == '/') uri = uri.substr(1)

    if (title) {
        if (Array.isArray(title))
            title = title.filter(str => typeof str !== 'undefined' && str !== '')

        const titleMain = Array.isArray(title) && title.length ? title[0] : title
        title = Array.isArray(title) ? title.join(' / ') : title

        const store = getStore()
        if (typeof subtitle !== 'undefined')
            store.dispatch(updatePageTitle({
                main: titleMain,
                sub: subtitle
            }))
        else
            store.dispatch(updatePageTitle(titleMain))

        if (title !== siteName)
            title = title.replace(/\n/g, '') + ' - ' + siteName
    }

    if (description) description = description.replace(/\n/g, '')

    if (origin.substr(origin.length - 1, 1) !== '/') origin += '/'

    return {
        title,
        metas: metas({
            title,
            description,
            image: image || (origin + 'launcher.jpg'),
            url: origin + uri,
            type: "website",
            locale: localeId,

            siteName,

            twitter: {
                card: "summary",
                siteCreator: "Diablohu"
            }
        }, true)
    }
    /*
    const meta = [
        // Schema.org markup for Google+
        { itemprop: 'name', content: title },
        { itemprop: 'description', content: description },
        { itemprop: 'image', content: image },

        // For FaceBook
        { property: 'fb:app_id', content: fb_app_id },
        { property: 'fb:admins', content: fb_app_id },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        // { property: 'og:url', content: options.currentOrigin + uri },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: siteName },
        { property: 'og:image', content: image },

        // For FaceBook App
        { property: 'al:ios:url', content: siteOrigin + uri },
        { property: 'al:ios:app_store_id', content: '543577420' },
        { property: 'al:ios:app_name', content: siteName },
        { property: 'al:android:url', content: 'cmpg://photogrid.cmcm.com/' + uri },
        { property: 'al:android:app_name', content: siteName },
        { property: 'al:android:package', content: 'com.roidapp.photogrid' },
        // { property: 'al:web:url', content: options.currentOrigin },

        // For Twitter
        { name: 'twitter:card', content: options["twitter:card"] },
        { name: 'twitter:site', content: '@photogridorg' },
        { name: 'twitter:creator', content: '@photogridorg' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
        { name: 'twitter:image:alt', content: title },
        { name: 'twitter:domain', content: 'photogrid.cmcm.com' },

        // For Twitter App
        { name: 'twitter:app:name:iphone', content: siteName },
        { name: 'twitter:app:id:iphone', content: '543577420' },
        { name: 'twitter:app:url:iphone', content: siteOrigin + uri },
        { name: 'twitter:app:name:googleplay', content: siteName },
        { name: 'twitter:app:id:googleplay', content: 'com.roidapp.photogrid' },
        { name: 'twitter:app:url:googleplay', content: 'cmpg://photogrid.cmcm.com/' + uri }
    ]
    */

    // if (fb_locale)
    //     fb_locale = fb_locale.replace(/-/g, '_')
    // else {
    //     availableLocalesFb.some(locale => {
    //         if (curLocaleId == getLocaleId(locale))
    //             fb_locale = locale
    //         return fb_locale
    //     })
    // }

    // if (fb_locale) {
    //     const localeId = getLocaleId(fb_locale)
    //     const fb_locale_parsed = fb_locale.replace(/_/g, '-').toLowerCase()
    //     const seg = fb_locale_parsed.split('-')

    //     // console.log(availableLocalesFb, localeId, fb_locale, seg)

    //     let localeMain, locales = []

    //     if (localeId === fb_locale_parsed || localeId === seg[0]) {
    //         localeMain = fb_locale
    //     } else {
    //         localeMain = availableLocalesFb[0]
    //     }

    //     locales = availableLocalesFb.filter(locale => locale !== localeMain)

    //     // console.log(localeMain, locales)

    //     meta.push({
    //         "property": "og:locale",
    //         "content": localeMain
    //     })

    //     locales.forEach(locale => {
    //         meta.push({
    //             "property": "og:locale:alternate",
    //             "content": locale
    //         })
    //     })
    // }
}

export default htmlHead
