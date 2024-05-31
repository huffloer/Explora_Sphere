<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use App\Models\Document;
use Illuminate\Support\Facades\Auth;

Route::middleware(['visit'])->group(function () {
        Route::get('/', function(){
        $user = null;
        $admin = false;
        $regular = false;

        if (Auth::guard('admin')->check()) {
            $user = Auth::guard('admin')->user();// Retrieve admin user
            $admin = true;
        } elseif (Auth::guard('subscriber')->check()) {
            $user = Auth::guard('subscriber')->user(); // Retrieve subscriber user
        } elseif (Auth::check()) {
            $user = Auth::user();
            $regular = true; // Retrieve regular user
        }

        $documents = Document::orderBy('created_at', 'desc')->take(3)->get()->toArray();

        $categories = Category::limit(8)->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'user'=>$user,
            'categories'=>$categories,
            'admin'=>$admin,
            'regular'=>$regular,
            'documents'=>$documents
        ]);
    })->name('home');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
    Route::get('/categories/{categoryId}/subcategories/{subcategoryId}', [SubcategoryController::class, 'show']);
    Route::get('/results',[SearchController::class,'search'])->name('search.results');

});

Route::middleware(['auth:subscriber', 'verified'])->group(function () {
    Route::get('/dashboard',[DashboardController::class,'getFavourites'])->name('dashboard');
    Route::post('/dashboard', [RequestController::class, 'store'])->name('requests.store');
    Route::post('/dashboard',[FavouriteController::class, 'removeFavourite'])->name('favourites.remove.dashboard');
    Route::post('/categories/{category}/subcategories/{subcategoryId}/favourites/add', [FavouriteController::class, 'addFavourite'])->name('favourites.add.subcategory');
    Route::post('/results/favourites/add', [FavouriteController::class, 'addFavourite'])->name('favourites.add.results');
    Route::post('/categories/{category}/subcategories/{subcategoryId}/favourites/remove', [FavouriteController::class, 'removeFavourite'])->name('favourites.remove.subcategory');
    Route::post('/results/favourites/remove', [FavouriteController::class, 'removeFavourite'])->name('favourites.remove.results');    
});

Route::middleware('auth:web,admin,subscriber')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

Route::middleware('auth:web')->group(function () {
    Route::post('/profile', [SubscriptionController::class, 'subscribe'])->name('subscribe');
});

Route::middleware('auth:admin')->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
    Route::post('/admin/users', [FormController::class, 'user'])->name('users.store');
    Route::get('/admin/articles', [AdminController::class, 'articles'])->name('admin.articles');
    Route::post('/admin/articles', [FormController::class, 'article'])->name('articles.store');
    Route::get('/admin/subscribers', [AdminController::class, 'subscribers'])->name('admin.subscribers');
    Route::get('/admin/demandes', [AdminController::class, 'demandes'])->name('admin.demandes');
    Route::get('/admin/statistiques', [AdminController::class, 'statistic'])->name('admin.statistiques');
    Route::get('/admin/calendrier', [AdminController::class, 'calendar'])->name('admin.calendrier');
    // Route::put('/admin/demandes', [RequestController::class, 'accept'])->name('requests.accept');
    // Route::patch('/admin/demandes', [RequestController::class, 'refuse'])->name('requests.refuse');
    Route::put('/admin/demandes/accept/{id}', [RequestController::class, 'accept'])->name('requests.accept');
    Route::patch('/admin/demandes/refuse/{id}', [RequestController::class, 'refuse'])->name('requests.refuse');
    
});

Route::middleware('auth:subscriber')->group(function () {
    // Subscriber routes
});

require __DIR__.'/auth.php';