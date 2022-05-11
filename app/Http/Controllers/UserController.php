<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;


class UserController extends Controller
{
    public function index() {
        $users = User::get();
        return (json_encode($users));
    }

    public function show($id) {
        $user = User::find($id);
        return (json_encode($user));
    }

    public function delete($id) {
        try {

            $user = User::where('id', $id) -> delete();
            return response()->json([
                'message'=>'User Deleted Successfully'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting user'
            ]);
        }
    }

    public function create(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required',
            'phone' => 'required'
        ]);

        try {
            $user = new User;
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->save();
            return response()->json([
                'message'=>'User Created Successfully'
            ]);
        } catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating user'
            ],500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required',
            'phone' => 'required'
        ]);

        try {
            $user = User::find($id);
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->save();
            return response()->json([
                'message'=>'User Updated Successfully'
            ]);

        } catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating user'
            ],500);
        }
    }
        
}
