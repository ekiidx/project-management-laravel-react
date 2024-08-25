<?php

namespace App\Http\Controllers;

use Spatie\LaravelPdf\Facades\Pdf;

use Illuminate\Http\Request;

class ProposalController extends Controller
{
    public function create()
    {
        $proposal_name = 'proposal.pdf';
        $pdf = Pdf::html('<h1>Hello world!!</h1>')->save('storage/proposals/proposal.pdf');

    }
}
