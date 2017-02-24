<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use DB;
use Response;


class MainController extends Controller
{
public function index(){
	return view('welcome');
}

   public function info(){
 $chars = DB::select('SELECT * FROM tbl_characters');
 	return Response::json($chars);
   }

    public function results($id) { 
 	$info = DB::select('SELECT * FROM tbl_characters WHERE id='.$id);
 	return Response::json($info);
 }
}