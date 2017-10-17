const path = require('path')

module.exports = (appPath, app) => {
    const isSPA = require('./_base').isSPA

    // console.log(appPath, app)

    switch (app) {
        case 'app': {
            const critical = [
                path.resolve(appPath, `./apps/app/client/critical`)
            ]
            if (isSPA)
                return {
                    critical,
                    client: [
                        path.resolve(appPath, `./apps/app/client/index.spa.js`)
                    ]
                }
            return {
                "critical-extra-old-ie": [
                    "babel-polyfill",
                    path.resolve(appPath, `./apps/app/client/critical.extra-old-ie.js`)
                ],
                critical,
                client: [
                    path.resolve(appPath, `./apps/app/client`)
                ]
            }
        }

        default: {
            return {
                critical: [
                    path.resolve(appPath, `./apps/${app}/client/critical`)
                ],
                client: [
                    path.resolve(appPath, `./apps/${app}/client`)
                ]
            }
        }

    }
}