export const template = `
    <!DOCTYPE html>
    <html>
    <head>
        <title><script>//inject_title</script></title>

        <base target="_self">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="UTF-8">

        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <meta name="format-detection" content="telephone=no,email=no,address=no">
        <meta name="format-detection" content="email=no">
        <meta name="format-detection" content="address=no">
        <meta name="format-detection" content="telephone=no">
        <meta name="HandheldFriendly" content="true">
        <meta name="mobile-web-app-capable" content="yes">

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/icon-128.png" type="image/png" sizes="128x128">
        <!--<link rel="icon" href="/icon-256.png" type="image/png" sizes="256x256">-->
        <script>//inject_manifest</script>

        <meta name="theme-color" content="#263238" />

        <!-- IE/Edge -->
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <!-- iOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

        <meta name="copyright" content="Copyright (c) 2017 fleet.moe">

        <script>//inject_component_styles</script>

        <!--INJECT_META_START-->
        <script>//inject_meta</script>
        <!--INJECT_META_END-->

        <script>//inject_critical_extra_old_ie_filename</script>
        <script>var __SERVICE_WORKER_FILENAME__ = "<script>//inject_pwa_filename</script>"</script>

        <script>//inject_critical</script>
    </head>
    <body>
        <div id="root">
            <div><script>//inject_html</script></div>
        </div>
        <script>//inject_svg</script>
        <script>//inject_redux_state</script>
        <script>//inject_js</script>
    </body>
    </html>
`