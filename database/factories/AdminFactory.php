<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Manel Rahmouni',
            'email' => 'manelrhmouni@gmail.com',
            'email_verified_at' => now(),
            // 'password' => static::$password ??= Hash::make('password'),
            'password'=>Hash::make('testtest'),
            'remember_token' => Str::random(10),
        ];
    }
}