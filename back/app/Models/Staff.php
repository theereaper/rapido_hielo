<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    protected $primaryKey = 'user_id';
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'name',
        'lastname',
    ];

    protected $casts = [
        'user_id' => 'string',
    ];

    // Relación 1:1 con User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public $incrementing = false;
}
