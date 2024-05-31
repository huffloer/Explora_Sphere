<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Document;
use App\Models\Keyword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
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
            // $subscriber = $request->user();
            // // Fetch the subscriber's favorite document IDs
            // $subscriberFavorites = $subscriber->favourites()->pluck('document_id')->toArray();
            info($user->favourites);
        } elseif (Auth::check()) {
            $user = Auth::user(); // Retrieve regular user
            $regular = true;
        } 

        $categories = Category::with('subcategories')->get();
        $keywords = Keyword::all();
        $documents = Document::orderBy('created_at', 'DESC');

        if ($request->has('search')) {
            $searchTerm = '%' . $request->get('search') . '%';
            $documents = $documents->where(function ($query) use ($searchTerm) {
                $query->where('title', 'like', $searchTerm)
                    ->orWhere('author', 'like', $searchTerm)
                    ->orWhere('description', 'like', $searchTerm);
            });
        }

        $documents = $documents->get(); 

        return Inertia::render('SearchResults', [
            'user' => $user,
            'categories' => $categories,
            'admin' => $admin,
            'regular' => $regular,
            'documents' => $documents,
            'subscriberFavorites' => $subscriberFavorites, // Pass the subscriber's favorite document IDs to the view
            'keywords'=> $keywords
        ]);
    }

}