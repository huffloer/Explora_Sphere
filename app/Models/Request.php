<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'document_title',
        'request_type',
        'document_author',
        'description',
        'url',
        'status',
    ];
}