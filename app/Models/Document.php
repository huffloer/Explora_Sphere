<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description','url', 'subcategory_id','author','published_date','imgurl'];

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function keywords()
    {
        return $this->belongsToMany(Keyword::class, 'document_keyword');
    }
}