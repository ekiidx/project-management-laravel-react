<?php

namespace App\Http\Controllers;

use Spatie\Browsershot\Browsershot;
use Illuminate\Http\Request;

class ProposalController extends Controller
{
    public function create()
    {
        $client_name = "Zoe";
        $product_name = "Event Flyer";

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

        // dd($proposal_background);

        // Preview
        $html = view('proposal', [
            'client_name' => $client_name,
            'product_name' => $product_name,
            'proposal_background' => $proposal_background,
            'vue_design_logo' => $vue_design_logo,
            'vue_design_icon' => $vue_design_icon
        ])->render();

        Browsershot::html($html)
        ->format('Letter')
        ->save('storage/proposals/proposal.pdf');

        return $html;
       
        // $html = view('proposal', [
        //     'client_name' => $client_name,
        //     'product_name' => $product_name,
        //     'proposal_background' => $proposal_background,
        //     'vue_design_logo' => $vue_design_logo
        // ])->render();
    }
}
