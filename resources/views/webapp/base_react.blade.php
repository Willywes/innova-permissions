<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts -->

    <link rel="preconnect" href="https://fonts.gstatic.com">

    <link rel="stylesheet" href="/themes/react/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="/themes/react/assets/plugins/toastr/toastr.min.css">
    <link rel="stylesheet" href="/themes/react/app/css/app.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    @yield('styles')

    <link rel="shortcut icon" href="/themes/react/favicon/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/themes/react/favicon/favicon.ico" type="image/x-icon">

    <link rel="apple-touch-icon" sizes="57x57" href="/themes/react/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/themes/react/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/themes/react/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/themes/react/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/themes/react/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/themes/react/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/themes/react/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/themes/react/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/themes/react/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/themes/react/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/themes/react/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/themes/react/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/themes/react/favicon/favicon-16x16.png">
    <link rel="manifest" href="/themes/react/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/themes/react/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <meta name="apple-mobile-react-app-title" content="{{ env('APP_NAME') }}">
    <meta name="application-name" content="{{ env('APP_NAME') }}">

    <meta name="title" content="{{ env('APP_NAME') }}">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="robots" content="index, nofollow">
    <meta name="language" content="Spanish">
    <meta name="revisit-after" content="4000 days">
    <meta name="author" content="{{ env('APP_NAME') }}">
    <meta name="rights" content="{{ env('APP_NAME') }}"/>

    <meta property="og:site_name" content="{{ env('APP_NAME') }}">
    <meta property="og:title" content="{{ env('APP_NAME') }}"/>
    <meta property="og:description" content=""/>
    <meta property="og:image" itemprop="image" content="{{ env('APP_URL') }}/themes/react/favicon/willywes-code.png">
    <meta property="og:type" content="reactsite"/>
    <meta property="og:updated_time" content="1440432930"/>
    <meta property="og:url" content="{{ env('APP_URL') }}"/>

    <title>{{ env('APP_NAME') }} | @yield('page-title')</title>

</head>
<body>


<div>
    <div id="app" style="overflow:hidden;"></div>
</div>

<script src="/themes/react/app/js/app.js"></script>
<script src="/themes/react/assets/js/custom.js"></script>

<script>

</script>

@yield('scripts')

</body>
</html>

