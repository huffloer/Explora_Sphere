<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequestController extends Controller
{
    public function accept($id)
    {
        $request = Request::findOrFail($id);
        
        // Update the status to 'Approved'
        $request->status = 'Aprouvée';
        $request->save();
        
        return redirect()->route('admin.demandes');
        // return redirect()->back()->with('success', 'Request has been accepted successfully.');
    }

    public function refuse($id)
    {
        $request = Request::findOrFail($id);
        
        // Update the status to 'Refused'
        $request->status = 'Refusée';
        $request->save();
        
        return redirect()->route('admin.demandes');
        // return redirect()->back()->with('success', 'Request has been refused successfully.');
    }

    public function store(Request $request)
{
    // Validate the request data
    $validator = Validator::make($request->all(), [
        'document_title' => 'required|string|max:255',
        'request_type' => 'required|in:Ajout,Modification',
        'document_author' => 'required|string|max:255',
        'description' => 'required|string',
        'url' => 'required|url',
        'status' => 'required|in:En attente,Aprouvée,Refusée',
    ]);

    // Check if the validation fails
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Get the ID of the authenticated subscriber
    $requesterId = Auth::id();
    
    // Create a new request with the requester_id set to the authenticated subscriber's ID
    $requestData = $request->all();
    $requestData['requester_id'] = $requesterId;
    $newRequest = \App\Models\Request::create($requestData);

    // Return a success response
    return response()->json(['message' => 'Request created successfully'], 200);
}
}