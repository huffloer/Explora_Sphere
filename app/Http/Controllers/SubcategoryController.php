<?php 
namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Keyword;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubcategoryController extends Controller
{
    public function show($categoryId, $subcategoryId)
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
            $subscriberFavorites = $user->favourites->pluck('document_id')->toArray();
        } elseif (Auth::check()) {
            $user = Auth::user(); // Retrieve regular user
            $regular = true;
        } 
        
        $keywords = Keyword::pluck('word')->toArray();
        $category = Category::findOrFail($categoryId);
        $subcategory = $category->subcategories()->with('documents')->findOrFail($subcategoryId);
        $categories = Category::with('subcategories')->get();

        // Return a response or view
        return Inertia::render('Category/Articles',[
            'user' => $user,'categories'=>$categories, 'admin'=>$admin,'regular' => $regular,
            'category' => $category,
            'subcategory' => $subcategory,
            'categories'=>$categories,
            'subscriberFavorites'=>$subscriberFavorites,
            'keywords'=> $keywords
        ]);
        
    }
}