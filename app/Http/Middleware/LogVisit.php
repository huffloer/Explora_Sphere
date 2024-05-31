<?php

namespace App\Http\Middleware;

use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LogVisit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // Determine the user ID if the user is authenticated, otherwise set it to null
        $userId = null;
        if (Auth::guard('admin')->check()) {
            $userId = Auth::guard('admin')->id();
        } elseif (Auth::guard('subscriber')->check()) {
            $userId = Auth::guard('subscriber')->id();
        } elseif (Auth::check()) {
            $userId = Auth::id();
        }

        // Log the visit
        Visit::create([
            'user_id' => $userId,
            'url' => $request->fullUrl(),
            'ip_address' => $request->ip(),
            'category_id' => $this->getCategoryIdFromRequest($request),
        ]);

        return $next($request);
    }

    protected function getCategoryIdFromRequest($request)
    {
        // Extract category ID from route parameters or query parameters
        if ($categoryId = $request->route('category')) {
            return $categoryId;
        }

        if ($categoryId = $request->route('categoryId')) {
            return $categoryId;
        }

        if ($categoryId = $request->query('category_id')) {
            return $categoryId;
        }

        return null;
    }
}