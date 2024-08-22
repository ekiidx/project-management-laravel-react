<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            return inertia('ClientDashboard');
        }

        if ($user->role === 'admin') {
            
            $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();
        $myProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();

        // $activeTasks = Task::query()
        //     ->whereIn('status', ['pending', 'in_progress'])
        //     ->where('assigned_user_id', $user->id)
        //     ->limit(10)
        //     ->get();

        // $activeTasks = TaskResource::collection($activeTasks);

        $query = Task::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        // Search
        // if (request('project_name')) {
        //     $query->where('project_name', 'like', '%' . request('project_name') . '%');
        // }
        // if (request('status')) {
        //     $query->where('status', request('status'));
        // }
        $activeTasks = $query->orderBy($sortField, $sortDirection)
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $user->id)
            // ->paginate(10)
            // ->onEachSide(1);
            ->limit(10)
            ->get();

        $activeTasks = TaskResource::collection($activeTasks);

        $queryParams = request()->query() ?: null;

        return inertia(
            'Dashboard',
            compact(
                'totalPendingTasks',
                'myPendingTasks',
                'totalProgressTasks',
                'myProgressTasks',
                'totalCompletedTasks',
                'myCompletedTasks',
                'activeTasks',
                'queryParams'
            )
        );

        }
       
        
    }
}