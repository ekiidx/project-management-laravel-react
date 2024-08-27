<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{

    // Remove JSON wrap around project object data
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'project_name' => $this->project_name,
            'client_name' => $this->client_name,
            'client_email' => $this->client_email,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'status' => $this->status,
            // if the image_path exists, use Storage facade url, and pass $this->image_path, if not, pass empty string
            // 'image_path' => $this->image_path && !(str_starts_with($this->image_path, 'http')) ?
            //     Storage::url($this->image_path) : $this->image_path,
            'image_path' => $this->image_path,
            'created_by' => $this->user->name,
            'updated_by' => $this->user->name,
            'user_id' => $this->user->id,
        ];
    }
}
