<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['image_path', 'user_id', 'project_name', 'product_name', 'client_name', 'client_email', 'description', 'status', 'stripe_payment_link', 'due_date', 'created_by', 'updated_by'];

    public function tasks() 
    {
        return $this->hasMany(Task::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // public function updatedBy()
    // {
    //     return $this->belongsTo(User::class, 'updated_by');
    // }
}
