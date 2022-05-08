<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;


class UserController extends Controller
{
    public function index() {
        $users = User::get();
        return (json_encode($users));
    }

    public function delete($id) {
        $user = User::where('id', $id) -> delete();

        if(!$user){
            return false;
        } else {
            $users = User::get();
            return (json_encode($users));
        }
    }
}
