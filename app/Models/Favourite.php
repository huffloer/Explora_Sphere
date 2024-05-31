<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{
    use HasFactory;

    protected $fillable = ['subscriber_id', 'document_id'];

    public function subscriber()
    {
        return $this->belongsTo(Subscriber::class);
    }

    public function document()
    {
        return $this->belongsToMany(Document::class);
    }
}