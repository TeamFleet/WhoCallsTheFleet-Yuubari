module.exports = {
    root: true,
    extends: ['koot'],
    globals: {
        __CHANNEL__: 'readonly',
        __ELECTRON__: 'readonly',
        __ICONSVG__: 'readonly',
        __PUBLIC__: 'readonly',
        __SWIPER_CSS__: 'readonly',
        __SVG_SYMBOLS__: 'readonly',
        __webpack_public_path__: 'writable',
        _hmt: 'readonly',
        Nedb: 'readonly',
        ga: 'readonly',
    },
    settings: {
        'import/ignore': ['node_modules', 'dist', 'dist*'],
    },
};
