<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Proposal;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Browsershot\Browsershot;
use Carbon\Carbon;
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
    public function store(StoreProjectRequest $request, Project $project) 
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            return abort(404);
        }

        if ($user->role === 'admin') {

            $data = $request->validated();

            $client_id = $data['user_id'] = $request->user_id;
            $client = User::find($client_id);

            $data['client_name'] = $client->name;
            $data['client_email'] = $client->email;
            $data['project_name'] = $request->project_name;
            $data['product_name'] = $request->product_name;
            $data['stripe_payment_link'] = $request->stripe_payment_link;
            $data['status'] = $request->status;
            $data['created_by'] = Auth::id();
            $data['updated_by'] = Auth::id();

            if ($request->hasfile('project_image')) {
                $image = $request->file('project_image');
                $image_filename = $image->getClientOriginalName();
                $image_extension = $image->getClientOriginalExtension();
                $image_no_extension = explode('.' . $image_extension, $image_filename);

                $image_slug = $image_no_extension[0] . '.' . $image_extension;

                $image->storeAs('projects', $image_slug, 'public');
                $data['project_image'] = '/storage/projects/' . $image_slug;
            }
            Project::create($data);

            // Create Proposal
            $bgPath = 'assets/img/proposal-background.png';
            $bgType = pathinfo($bgPath, PATHINFO_EXTENSION);
            $bgData = file_get_contents($bgPath);
            $proposal_background = 'data:image/' . $bgType . ';base64,' . base64_encode($bgData);

            $logoPath = 'assets/img/vue-design-logo.png';
            $logoType = pathinfo($logoPath, PATHINFO_EXTENSION);
            $logoData = file_get_contents($logoPath);
            $vue_design_logo = 'data:image/' . $logoType . ';base64,' . base64_encode($logoData);

            $logoPath = 'assets/img/vue-design-icon.png';
            $logoType = pathinfo($logoPath, PATHINFO_EXTENSION);
            $logoData = file_get_contents($logoPath);
            $vue_design_icon = 'data:image/' . $logoType . ';base64,' . base64_encode($logoData);

            Proposal::create($data);

             // Proposal Preview
             $proposal_html = view('proposal', [
                'client_name' => $data['client_name'],
                'project_name' => $data['project_name'],
                'proposal_background' => $proposal_background,
                'vue_design_logo' => $vue_design_logo,
                'vue_design_icon' => $vue_design_icon
            ])->render();

            $date = Carbon::now()->format('Y-m-d');

            Browsershot::html($proposal_html)
            ->format('Letter')
            ->save('storage/proposals/' . $data['client_name'] . ' - ' . $data['product_name'] . ' - ' . $date . ' - ' . 'proposal.pdf');

            // Create Invoice
             $invoice_number = '00113';
             $invoice_data['client_name'] = $data['client_name'];
    
            // Invoice Preview
            $invoice_html = view('invoice', [
                'client_name' => $data['client_name'],
                'project_name' => $data['project_name'],
                'invoice_number' => $invoice_number,
                'proposal_background' => $proposal_background,
                'vue_design_logo' => $vue_design_logo,
            ])->render();
    
            Browsershot::html($invoice_html)
            ->format('Letter')
            ->save('storage/invoices/' . $data['client_name'] . ' - ' . $data['product_name'] . ' - ' . $date . ' - ' . 'invoice.pdf');
    
            Invoice::create($invoice_data);

            // Send Email
            // $message = 'This is a test email.';
            
            Mail::send('email_' . $data['product_name'], [
                'name' => $request->client_name,
                'email' => $request->client_email,
                'stripe_payment_link' => $data['stripe_payment_link'] ],
                function ($message) use($data, $date) {
                    $message->from('admin@project_management.com');
                    $message->to($data['client_email'], $data['client_name'])
                    ->subject('New Project "' . $data['project_name'] . '" Created.');
                    $message->attach('storage/proposals/' . $data['client_name'] . ' - ' . $data['product_name'] . ' - ' . $date . ' - ' . 'proposal.pdf');
                    $message->attach('storage/invoices/' . $data['client_name'] . ' - ' . $data['product_name'] . ' - ' . $date . ' - ' . 'invoice.pdf');
            });

            return to_route('projects.index')
                ->with('success', 'Project was created.');
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
        
            // $data['client_name'] = $client->name;
            // $project->client_email = $request->client_email;
            $project->user_id = $request->user_id;
            $project->project_name = $request->project_name;
            $project->product_name = $request->product_name;
            $project->stripe_payment_link = $request->stripe_payment_link;
            $project->status = $request->status;
            $project->updated_by = Auth::id();

            if ($request->hasfile('project_image')) {
                $image = $request->file('project_image');
                $image_filename = $image->getClientOriginalName();
                $image_extension = $image->getClientOriginalExtension();
                $image_no_extension = explode('.' . $image_extension, $image_filename);

                $image_slug = $image_no_extension[0] . '.' . $image_extension;

                $image->storeAs('projects', $image_slug, 'public');
                $project->project_image = '/storage/projects/' . $image_slug;
            }
            $project->save();

            return to_route('projects.index')
                ->with('success', "Project \"$project->project_name\" was updated");
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

            $name = $project->project_name;
            $project->delete();
            if ($project->project_image) {
                Storage::disk('public')->deleteDirectory(dirname($project->project_image));
            }
            return to_route('projects.index')
                ->with('success', "Project \"$name\" was deleted");
        }
    }
}