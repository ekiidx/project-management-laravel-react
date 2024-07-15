<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CreateProjectController extends Controller
{
    public function create(User $user)
    {

        return inertia('Project/Create', compact($user));
    }

    public function store(StoreProjectRequest $request) {

        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }
        Project::create($data);

        $message = 'This is a test email.';
        
        Mail::send('email', [
            'name' => $request->get('client_name'),
            'email' => $request->get('client_email'), ],
            function ($message) {
                    $message->from('admin@project_management_laravel_react.com');
                    $message->to('youremail@your_domain', 'Your Name')
                    ->subject('New Project "' . 'Project Name' . '" Created.');
        });

        return to_route('project.index')
            ->with('success', 'Project was created');
    }

}
