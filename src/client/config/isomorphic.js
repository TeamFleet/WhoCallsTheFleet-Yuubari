import { getInjectionJsFilename } from 'sp-react-isomorphic'
import { localeId as currentLocaleId } from 'sp-i18n'

export const distPathName = 'dist-web'

// 同构配置
export default {
    // 打包结果目标目录，如果为空默认为 /dist
    distPathName: distPathName,

    // 对HTML基础模板的自定义注入
    // 例如：<script>//inject_critical</script>  替换为 critical
    injection: {
        js: (args) => `<script async src="${args.path}/${getInjectionJsFilename('client')}"></script>`,
        manifest: () => `<link rel="manifest" href="/manifest-${currentLocaleId}.json">`,
        critical: (args) => `<script src="${args.path}/${getInjectionJsFilename('critical')}"></script>`,
        critical_extra_old_ie_filename: (args) => `<script>var __CRITICAL_EXTRA_OLD_IE_FILENAME__ = "${args.path}/${getInjectionJsFilename('critical-extra-old-ie')}"</script>`
    }
}