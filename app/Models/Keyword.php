<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{
    use HasFactory;
    
    protected $fillable=['word'];

    public function documents()
    {
        return $this->belongsToMany(Document::class, 'document_keyword');
    }
}