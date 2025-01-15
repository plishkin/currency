<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <title>Laravel</title>
    @vite('resources/ts/app.ts')
    @vite('resources/sass/app.scss')
</head>
<body class="antialiased">
<div class="container">
    <div id="root"></div>
</div>
</body>
</html>
