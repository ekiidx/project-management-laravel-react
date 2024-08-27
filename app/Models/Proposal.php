<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    use HasFactory;

    protected $fillable = ['client_name', 'project_name', 'user_id', 'product_name', 'stripe_payment_link', 'client_email'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
