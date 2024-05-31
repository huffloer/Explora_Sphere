<?php

namespace App\Http\Controllers;

use Illuminate\Console\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home(){
        $user = null;

        if (Auth::guard('admin')->check()) {
            $user = Auth::guard('admin')->user(); // Retrieve admin user
        } elseif (Auth::guard('subscriber')->check()) {
            $user = Auth::guard('subscriber')->user(); // Retrieve subscriber user
        } elseif (Auth::check()) {
            $user = Auth::user(); // Retrieve regular user
        }


        if(request()->has('search')){
            
        }

        
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            // 'laravelVersion' => Application::VERSION,
            'laravelVersion' => 'Laravel v11.3.1',
            'phpVersion' => PHP_VERSION,
        ],['user'=>$user]);
        
    }
}