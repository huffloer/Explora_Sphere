<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'admin'=>\App\Http\Middleware\AuthenticateAdmin::class,
            'regular'=>\App\Http\Middleware\Regular::class,
            'user'=>\App\Http\Middleware\AuthenticateUser::class,
            'subscriber'=>\App\Http\Middleware\AuthenticateSubscriber::class,
            'visit'=>\App\Http\Middleware\LogVisit::class
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();