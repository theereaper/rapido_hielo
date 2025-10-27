<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => '+569999999999',
            'role' => $request->role,
            'status' => 'active'
        ]);

        return response()->json(['user' => $user], 200);
    }

    public function login(LoginRequest $request)
    {
        $email = $request->email;

        $user = User::select('name', 'lastname', 'password')->where('email', $email)->firstOrFail();

        return $user;
    }
}
