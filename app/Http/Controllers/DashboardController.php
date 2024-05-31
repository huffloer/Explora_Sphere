<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function getFavourites(Request $request)
    {
         // Retrieve the currently authenticated subscriber
        $subscriber = $request->user();

        // Retrieve the favorite document IDs associated with the subscriber
        $favoriteDocumentIds = $subscriber->favourites()->pluck('document_id');

        // Retrieve the documents using the favorite document IDs
        $favoriteDocuments = Document::whereIn('id', $favoriteDocumentIds)->get();

        // Return the favorite documents as a response
        return Inertia::render('Dashboard', [
            "favs" => $favoriteDocuments,
            "user" => $subscriber
        ]);
    }
}