<?php

namespace App\Http\Controllers;

use Spatie\Browsershot\Browsershot;
use App\Models\Proposal;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProposalController extends Controller
{
    public function index() 
    {
        $proposals = Proposal::all();

        return inertia('Proposal/Index', [
            'proposals' => $proposals
        ]);
    }

    public function create()
    {
        return inertia('Proposal/Create');
    }

    public function store(Request $request, Proposal $proposal)
    {
        $user = auth()->user();

        if ($user->role === 'client') {

            return abort(404);
        }

        if ($user->role === 'admin') {

            $request->validate([
                'client_name' => ['required', 'max:255'],
                'user_id' => ['required', 'integer'],
                'product_name' => ['required', 'max:255'],
                'stripe_payment_link' => ['required', 'max:255'],
                'client_email' => ['required', 'max:255'],
            ]);

            $data['client_name'] = $request->client_name;
            $data['user_id'] = $request->user_id;
            $data['product_name'] = $request->product_name;
            $data['stripe_payment_link'] = $request->stripe_payment_link;
            $data['client_email'] = $request->client_email;

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

            // Preview
            $html = view('proposal', [
                'client_name' => $data['name'],
                'product_name' => $data['product_name'],
                'proposal_background' => $proposal_background,
                'vue_design_logo' => $vue_design_logo,
                'vue_design_icon' => $vue_design_icon
            ])->render();

            $date = Carbon::now()->format('Y-m-d');

            Browsershot::html($html)
            ->format('Letter')
            ->save('storage/proposals/' . $data['name'] . ' - ' . $data['product_name'] . ' - ' . $date . ' - ' . 'proposal.pdf');

            return to_route('proposals.index')
            ->with('success', 'Proposal was created');
        
            // $html = view('proposal', [
            //     'client_name' => $client_name,
            //     'product_name' => $product_name,
            //     'proposal_background' => $proposal_background,
            //     'vue_design_logo' => $vue_design_logo
            // ])->render();
        }
    }
}
