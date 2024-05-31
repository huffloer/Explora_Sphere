<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class FormController extends Controller
{
    public function user(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create a new user instance
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);
        // Save the user
        $user->save();

        // Return a response, such as a redirect or a JSON response
        return response()->noContent();
    }

    public function article(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'subcategory_id' => 'required|exists:subcategories,id', // Validate that subcategory_id exists in the subcategories table
                'title' => 'required|string|max:255',
                'auteur' => 'required|string|max:255',
                'description' => 'required|string',
                'published_date' => 'required|date',
                'url' => 'required|url',
                'imgurl' => 'required|string|max:255',
            ]);
    
            // Create a new Document instance
            $document = Document::create([
                'subcategory_id' => $validatedData['subcategory_id'], // Include subcategory in the creation process
                'title' => $validatedData['title'],
                'auteur' => $validatedData['auteur'],
                'description' => $validatedData['description'],
                'published_date' => $validatedData['published_date'],
                'url' => $validatedData['url'],
                'imgurl' => $validatedData['imgurl']
            ]);
    
            // Return a response, such as a redirect or a JSON response
            return response()->noContent();
        } catch (QueryException $e) {
            // Log or output the exception for debugging
            dd($e->getMessage());
            // Return a response indicating a server error
            return response()->serverError();
        } catch (\Exception $e) {
            // Log or output the exception for debugging
            dd($e->getMessage());
            // Return a response indicating a server error
            return response()->serverError();
        }
    }

    
}