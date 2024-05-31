<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Document;
use App\Models\Request;
use App\Models\Subcategory;
use App\Models\Subscriber;
use App\Models\User;
use App\Models\Visit;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function users(){
        $users = User::all();
        return Inertia::render('Admin/Partials/Users',['users'=>$users]);
        
    }

    public function demandes(){
        $requests = Request::all();
        return Inertia::render('Admin/Partials/Requests',['requests'=>$requests]);
        
    }

    public function subscribers(){
        $subscribers = Subscriber::all();
        return Inertia::render('Admin/Partials/Subscribers',['subscribers'=>$subscribers]);
        
    }
    
    public function statistic(){
        
        $categories = Category::all();

        // Initialize an array to store category visit counts
        $categoryVisits = [];

        // Loop through each category
        foreach ($categories as $category) {
            // Get the visit count for this category
            $visitCount = Visit::where('category_id', $category->id)->count();

            // Store category name and visit count in the array
            $categoryVisits[] = [
                'category' => $category->title,
                'visits' => $visitCount,
            ];
        }

        // Total users
        $totalUsers = User::count();

        // Percentage of subscribers
        $totalSubscribers = Subscriber::count();
        $subscriberPercentage = (($totalUsers > 0) || ($totalSubscribers > 0) ) ?round( ($totalSubscribers * 100 / ($totalUsers+$totalSubscribers))): 0;

        // Percentage of requests
        $modifyRequests =  Request::where('request_type', 'Modification')->count();
        $addRequests = Request::where('request_type', 'Ajout')->count();

        $modify = (($totalUsers > 0) || ($totalSubscribers > 0) ) ? round($modifyRequests * 100 / ($modifyRequests + $addRequests)): 0;
        $add = (($totalUsers > 0) || ($totalSubscribers > 0) ) ? round($addRequests * 100 / ($modifyRequests + $addRequests)): 0;

        $totalVisits = Visit::count();
        
        
        return Inertia::render('Admin/Partials/Statistics',['totalUsers'=>$totalUsers,'subscriberPercentage'=>$subscriberPercentage,'modifyRequests'=>$modify,'addRequests'=>$add,'totalVisits'=>$totalVisits,'categoryVisits'=>$categoryVisits]);
        
    }
    
    public function calendar(){
        // Fetch all requests from the database
        $requests = Request::all();
        
        // Organize the requests by their created_at attribute
        $organizedRequests = $requests->groupBy(function ($request) {
            return $request->created_at->format('Y-m-d');
        });

        // Pass the organized requests to your view or return them as JSON
        // return response()->json($organizedRequests);
        return Inertia::render('Admin/Partials/Calendar',["data"=>$requests]);
        
    }

    public function articles(){
        $subcategories = Subcategory::all()->toArray();
        $articles = Document::all();
        return Inertia::render('Admin/Partials/Articles', ['articles' => $articles, 'subcategories' => $subcategories]);
    }
    
    // public function settings()
    // {
    //     // Fetch data for the settings page
    //     $data = [
    //         'user' => auth()->user(), // Example data, assuming you have an authenticated user
    //         // Add more data as needed
    //     ];

    //     // Return Inertia response with the Vue component name and data
    //     return Inertia::render('Admin/Settings', $data);
    // }

}