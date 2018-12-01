export default {
    manifest: '',

    svgIcons: `<div class="hide">${__SVG_SYMBOLS__}</div>`
        + (__DEV__ ? `<script>var __ICONSVG__ = "${__SVG_SYMBOLS__}"</script>` : ''),

    definePath: '',
}
