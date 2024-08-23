<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Mail;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            $query = Project::query();

            $sortField = request('sort_field', 'created_at');
            $sortDirection = request('sort_direction', 'desc');

            if (request('project_name')) {
                $query->where('project_name', 'like', '%' . request('project_name') . '%');
            }
            if (request('status')) {
                $query->where('status', request('status'));
            }

            $projects = Project::where('user_id', $user->id)->get();

            return inertia('Client/Project/Index', ['projects' => $projects]); 
        }

        if ($user->role === 'admin') {

            $query = Project::query();

            $sortField = request('sort_field', 'created_at');
            $sortDirection = request('sort_direction', 'desc');

            if (request('project_name')) {
                $query->where('project_name', 'like', '%' . request('project_name') . '%');
            }
            if (request('status')) {
                $query->where('status', request('status'));
            }

            $projects = $query->orderBy($sortField, $sortDirection)
                ->paginate(10)
                ->onEachSide(1);

            return inertia("Project/Index", [
                'projects' => ProjectResource::collection($projects),
                'queryParams' => request()->query() ?: null,
                'success' => session('success'),
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            return abort(404);
        }

        if ($user->role === 'admin') {

            return inertia('Project/Create');
        }
    }

        /**
     * Show the form for creating a new resource.
     */
    public function create_with_id($id)
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            return abort(404);
        }

        if ($user->role === 'admin') {

            $user_find = User::where('id', $id)->firstOrFail();
            return inertia('Project/CreateWithId', [
                'user_id' => $user_find->id
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(StoreProjectRequest $request, $id) {
    public function store(Request $request, Project $project) 
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            return abort(404);
        }

        if ($user->role === 'admin') {

            $request->validate([
                'project_name' => ['required', 'max:255'],
                // 'client_name' => ['required', 'max:255'],
                // 'client_email' => ['required', 'max:255'],
                'image' => ['nullable', 'image'],
                'description' => ['nullable', 'string'],
                'start_date' => ['nullable', 'date'],
                'due_date' => ['nullable', 'date'],
                'status' => ['required', Rule::in(['pending', 'in_progress', 'completed'])]
            ]);

            // $data = $request->validated();
            // $project->users()->create({[
            // ]}) 
            // $user = User::where('id', $user)->firstOrFail();
            // dd($request->user()->name);
            // $id = '2';

            $data['user_id'] = $request->user_id;
            // $data['user_id'] = $request->input($user->id);
            // $data['client_name'] = $request->name;
            // $data['client_email'] = $request->email;
            $data['project_name'] = $request->project_name;
            $data['status'] = $request->status;
            
            /** @var $image \Illuminate\Http\UploadedFile */
            $image = $data['image'] ?? null;
            $data['created_by'] = '2';
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

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            if ($project->user_id === $user->id ) {

                $project = Project::where('id', $project->id)->firstOrFail();
            
                return inertia('Client/Project/Show', [
                    'project' => $project
                ]);
            }

            return abort(404);
        }
            
        if ($user->role === 'admin') {   
            $query = $project->tasks();

            $sortField = request("sort_field", 'created_at');
            $sortDirection = request("sort_direction", "desc");

            if (request("project_name")) {
                $query->where("project_name", "like", "%" . request("project_name") . "%");
            }
            if (request("status")) {
                $query->where("status", request("status"));
            }

            $tasks = $query->orderBy($sortField, $sortDirection)
                ->paginate(10)
                ->onEachSide(1);

                // Display tasks table if there are tasks to show
                if(count($tasks) <= 0) {
                    $if_tasks = false;
                } elseif (count($tasks) > 0) {
                    $if_tasks = true;
                }

            return inertia('Project/Show', [
                'if_tasks' => $if_tasks,
                'project' => new ProjectResource($project),
                'tasks' => TaskResource::collection($tasks),
                'queryParams' => request()->query() ?: null,
                'success' => session('success'),
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            return abort(404);
        }

        if ($user->role === 'admin') {

            return inertia('Project/Edit', [
                'project' => new ProjectResource($project),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            return abort(404);
        }

        if ($user->role === 'admin') {

            $data = $request->validated();
            $image = $data['image'] ?? null;
            $data['updated_by'] = Auth::id();
            if ($image) {
                if ($project->image_path) {
                    Storage::disk('public')->deleteDirectory(dirname($project->image_path));
                }
                $data['image_path'] = $image->store('project/' . Str::random(), 'public');
            }
            $project->update($data);

            return to_route('project.index')
                ->with('success', "Project \"$project->name\" was updated");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            return abort(404);
        }

        if ($user->role === 'admin') {

            $name = $project->name;
            $project->delete();
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            return to_route('project.index')
                ->with('success', "Project \"$name\" was deleted");
        }
    }
}