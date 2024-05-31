<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $regular = false;
        // Check if the user is authenticated
        if (Auth::guard('admin')->check()) {
            $user = Auth::guard('admin')->user();
        } elseif (Auth::guard('subscriber')->check()) {
            $user = Auth::guard('subscriber')->user();
        } else {
            $user = Auth::user();
            $regular = true;
        }

        return Inertia::render('Profile/Edit', [
            'user' => $user,
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'regular' => $regular
        ]);
    }

 
    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
                
        // // Get the authenticated user
        // $user = $request->user();
        if (Auth::guard('admin')->check()) {
            $user = Auth::guard('admin')->user();
            $userModel = Admin::find($user->id);
        } elseif (Auth::guard('subscriber')->check()) {
            $user = Auth::guard('subscriber')->user();
            $userModel = Subscriber::find($user->id);
        } else {
            $user = Auth::user();
            $userModel = User::find($user->id);
        }

        // Update user's profile information
        $userModel->fill($request->validated());

        if ($userModel->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $userModel->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Get the authenticated user
        $user = $request->user();

        // Logout the user
        Auth::logout();

        // Delete the user's account
        $user->delete();

        // Invalidate session and regenerate token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}