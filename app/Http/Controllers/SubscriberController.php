<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    public function showSubcategory($categoryId, $subcategoryId)
    {
        $user = null;
        $subscriberFavorites = [];

        $user = Auth::guard('subscriber')->user(); 
        $subscriberFavorites = $user->favourites->pluck('document_id')->toArray();

        $category = Category::findOrFail($categoryId);
        $subcategory = $category->subcategories()->findOrFail($subcategoryId);
        $categories = Category::with('subcategories')->get();

        // Return a response or view
        return Inertia::render('Category/Articles', [
            'user' => $user,
            'categories' => $categories,
            'admin' => false,
            'regular' => false,
            'category' => $category,
            'subcategory' => $subcategory,
            'subscriberFavorites' => $subscriberFavorites,// Pass the subscriber's favorite documents to the view
        ]);
    }
}