<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
            'payment_amount' => 'required|numeric|min:0',
            'subscription_plan' => 'required|string',
        ]);

         // Retrieve the authenticated user
         $user = $request->user();
         $password = $user->password;
 
         // Store the user's information
         $userData = [
             'id' => $user->id,
             'name' => $user->name,
             'email' => $user->email,
             'password' => $password,
         ];
 
         // Log out the user
         Auth::logout();
         $request->session()->invalidate();  // Invalidate the session
         $request->session()->regenerateToken();  // Regenerate the token
 
 
         // Delete the user's account
         $user->delete();
 
         // Create a subscriber record
         $subscriber = Subscriber::create([
             'name' => $userData['name'],
             'email' => $userData['email'],
             'password' => $userData['password'],
         ]);

        // Create a payment instance
        $payment = Payment::create([
            'subscriber_id' => $subscriber->id,
            'amount' => $request->payment_amount,
            'method' => $request->payment_method,
            'status' => 'En Attente', // Example initial status
            'payment_date' => now(), // Example current timestamp
            'subscription_plan' => $request->subscription_plan,
            // Add other payment details as needed
        ]);

         // Log in the user as a subscriber using their credentials
         Auth::guard('subscriber')->login($subscriber);

        // Redirect to the subscriber dashboard
        return redirect()->route('profile.edit');
    }
}