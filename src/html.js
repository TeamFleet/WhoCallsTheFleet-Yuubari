export const template = `
    <!DOCTYPE html>
    <html<script>//inject_htmlattr</script>>
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
        <link rel="icon" href="/icon-256.png" type="image/png" sizes="256x256">
        <link rel="icon" href="/icon-128.png" type="image/png" sizes="128x128">
        <script>//inject_manifest</script>

        <meta name="theme-color" content="#263238" />

        <!-- IE/Edge -->
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <!-- iOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

        <meta name="copyright" content="Copyright (c) 2017 fleet.moe">

        <!--INJECT_META_START--><script>//inject_metas</script><!--INJECT_META_END-->

        <script>//inject_critical_css</script>
        <!--<script>inject_style</script>-->

        <script>var __SERVICE_WORKER_FILENAME__ = "<script>//inject_serviceworker_path</script>"</script>
        <script>//inject_critical_extra_old_ie_filename</script>
        <!--<script>inject_client_filename</script>-->
    </head>
    <body>
        <div id="boat-loader">LOADING...</div>

        <div id="root">
            <script>//inject_react</script>
        </div>
        <script>//inject_svg_symbols</script>
        <script>//inject_redux</script>
        <script>//inject_scripts</script>
        <!--<script>inject_js</script>-->

        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-63582858-4', 'auto');
            ga('send', 'pageview');
        </script>
    </body>
    </html>
`
