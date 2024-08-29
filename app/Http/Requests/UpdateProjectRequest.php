<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'project_name' => ['required', 'max:255'],
            'user_id' => ['required'],
            'product_name' => ['required', Rule::in(['event_flyer', 'event_flyer_banner', 'event_flyer_banner_spotlights', 'monthly_host', 'unlimited_monthly_package'])],
            // 'client_name' => ['required', 'max:255'],
            'stripe_payment_link' => ['url:http,https'],
            // 'project_image' => ['nullable'],
            'description' => ['nullable', 'string'],
            'start_date' => ['nullable', 'date'],
            'due_date' => ['nullable', 'date'],
            'status' => ['required', Rule::in(['pending', 'in_progress', 'completed'])]
        ];
    }
}