<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// home Route
Route::get('/home', function () {
    return view('home');
})->name('home');
// home about
Route::get('/about', function () {
    return view('about');
})->name('about');
// home films
Route::get('/films', function () {
    return view('films');
})->name('films');
// home news
Route::get('/news', function () {
    return view('news');
})->name('news');
// home contact
Route::get('/contacts', function () {
    return view('contacts');
})->name('contacts');
