<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favourite;
use Illuminate\Support\Facades\Auth;

class FavouriteController extends Controller
{
    public function addFavourite(Request $request)
    {
        $request->validate([
            'document_id' => 'required|exists:documents,id',
        ]);

        $documentId = $request->input('document_id');
        $subscriberId = Auth::id();

        $existingFavorite = Favourite::where('document_id', $documentId)
            ->where('subscriber_id', $subscriberId)
            ->first();

        if ($existingFavorite) {
            return response()->json(['success' => false, 'message' => 'Document already in favorites']);
        } else {
            $favorite = Favourite::create([
                'document_id' => $documentId,
                'subscriber_id' => $subscriberId,
            ]);
        }
    }
    
    public function removeFavourite(Request $request)
    {
        $request->validate([
            'document_id' => 'required|exists:documents,id',
        ]);

        $documentId = $request->input('document_id');
        $subscriberId = Auth::id();

        $existingFavorite = Favourite::where('document_id', $documentId)
            ->where('subscriber_id', $subscriberId)
            ->first();

        if ($existingFavorite) {
            $existingFavorite->delete();}
    }
}