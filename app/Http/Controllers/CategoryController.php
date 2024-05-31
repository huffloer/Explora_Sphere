<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
{
    $user = null;
    $admin = false;
    $regular = false;
    $subscriberFavorites = [];

    if (Auth::guard('admin')->check()) {
        $user = Auth::guard('admin')->user(); // Retrieve admin user
        $admin = true;
    } elseif (Auth::guard('subscriber')->check()) {
        $user = Auth::guard('subscriber')->user(); 
        // Fetch the subscriber's favorite document IDs
        $subscriberFavorites = $user->favourites->pluck('document_id')->toArray();
    } elseif (Auth::check()) {
        $user = Auth::user(); // Retrieve regular user
        $regular = true;
    }

    $categories = Category::with('subcategories')->get();

    return Inertia::render('Category/Index', [
        'categories' => $categories,
        'user' => $user,
        'admin' => $admin,
        'regular' => $regular,
        'subscriberFavorites' => $subscriberFavorites, // Pass the subscriber's favorite documents to the view
    ]);
}


public function show($id)
{
    $user = null;
    $admin = false;
    $regular = false;
    $subscriberFavorites = [];

    if (Auth::guard('admin')->check()) {
        $user = Auth::guard('admin')->user(); // Retrieve admin user
        $admin = true;
    } elseif (Auth::guard('subscriber')->check()) {
        $user = Auth::guard('subscriber')->user(); // Retrieve subscriber user
        // Fetch the subscriber's favorite document IDs
        $subscriberFavorites = $user->favourites->pluck('document_id')->toArray();
    } elseif (Auth::check()) {
        $user = Auth::user(); // Retrieve regular user
        $regular = true;
    }

    $category = Category::findOrFail($id); // Retrieve category by ID or throw 404 error if not found
    $categories = Category::with('subcategories')->get();
    $subcategories = $category->subcategories;

    return Inertia::render('Category/Show', [
        'category' => $category,
        'user' => $user,
        'categories' => $categories,
        'admin' => $admin,
        'regular' => $regular,
        'subcategories' => $subcategories,
        'subscriberFavorites' => $subscriberFavorites,// Pass the subscriber's favorite document IDs to the view
    ]);
}

    
    public function showSubcategory($categoryId, $subcategoryId)
    {
        $user = null;
        $admin = false;
        $regular = false;
        $subscriberFavorites = [];

        if (Auth::guard('admin')->check()) {
            $user = Auth::guard('admin')->user(); // Retrieve admin user
            $admin = true;
        } elseif (Auth::guard('subscriber')->check()) {
            $user = Auth::guard('subscriber')->user(); // Retrieve subscriber user
            // Fetch the subscriber's favorite documents
            $subscriberFavorites = $user->favourites->pluck('document_id')->toArray();
            // ddd($subscriberFavorites);
        } elseif (Auth::check()) {
            $user = Auth::user(); // Retrieve regular user
            $regular = true;
        }

        $category = Category::findOrFail($categoryId);
        $subcategory = $category->subcategories()->findOrFail($subcategoryId);
        $categories = Category::with('subcategories')->get();

        // Return a response or view
        return Inertia::render('Category/Articles', [
            'user' => $user,
            'categories' => $categories,
            'admin' => $admin,
            'regular' => $regular,
            'category' => $category,
            'subcategory' => $subcategory,
            'subscriberFavorites' => $subscriberFavorites,// Pass the subscriber's favorite documents to the view
        ]);
    }
}