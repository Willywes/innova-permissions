<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'description',
        'database_connection',
        'laravel_guards',
        'user_classes',
        'json',
    ];

    protected $casts = [
        'database_connection' => 'array',
        'laravel_guards' => 'array',
        'user_classes' => 'array'
    ];
}
