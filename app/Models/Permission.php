<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $connection = 'dynamic';

    protected $fillable = [
        'id',
        'name',
        'guard_name',
        'public_name',
        'public_group',
        'public_description',
        'created_at',
        'updated_at',
    ];
}
