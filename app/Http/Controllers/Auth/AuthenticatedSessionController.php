<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    // public function create(): Response
    // {
    //     return Inertia::render('Auth/Login', [
    //         'canResetPassword' => Route::has('password.request'),
    //         'status' => session('status'),
    //     ]);
    // }

    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            // 'adminLoginRoute' => route('admin.login'), // Route for admin login
            // 'subscriberLoginRoute' => route('subscriber.login'), // Route for subscriber login
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    // public function store(LoginRequest $request): RedirectResponse
    // {
    //     $request->authenticate();

    //     $request->session()->regenerate();

    //     return redirect()->intended(route('dashboard', absolute: false));
    // }

    public function store(LoginRequest $request): RedirectResponse
    {
        if (Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            // Admin authenticated
            return redirect()->intended(route('admin.dashboard', [], false));
        }

        if (Auth::guard('subscriber')->attempt($request->only('email', 'password'))) {
            // Subscriber authenticated
            return redirect()->intended(route('dashboard', [], false));
        }

        if ($request->authenticate()) {
            // Regular user authenticated
            $request->session()->regenerate();

            return redirect()->intended(route('profile.edit', [], false));
        }

        // Authentication failed
        return back()->withErrors(['email' => 'Invalid credentials']);
    }


    /**
     * Destroy an authenticated session.
     */
    // public function destroy(Request $request): RedirectResponse
    // {
    //     Auth::guard('web')->logout();

    //     $request->session()->invalidate();

    //     $request->session()->regenerateToken();

    //     return redirect('/');
    // }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        Auth::guard('admin')->logout();
        Auth::guard('subscriber')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

}