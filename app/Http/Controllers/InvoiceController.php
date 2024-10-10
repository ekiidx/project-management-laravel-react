<?php

namespace App\Http\Controllers;

use Spatie\Browsershot\Browsershot;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::all();

        return inertia('Invoice/Index', [
            'invoices' => $invoices
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $client_name = "Zoe";
        $product_name = "Event Flyer";
        $invoice_number = '00113';

        $bgPath = 'assets/img/proposal-background.png';
        $bgType = pathinfo($bgPath, PATHINFO_EXTENSION);
        $bgData = file_get_contents($bgPath);
        $proposal_background = 'data:image/' . $bgType . ';base64,' . base64_encode($bgData);

        $logoPath = 'assets/img/vue-design-logo.png';
        $logoType = pathinfo($logoPath, PATHINFO_EXTENSION);
        $logoData = file_get_contents($logoPath);
        $vue_design_logo = 'data:image/' . $logoType . ';base64,' . base64_encode($logoData);

        // Preview
        $html = view('invoice', [
            'client_name' => $client_name,
            'product_name' => $product_name,
            'invoice_number' => $invoice_number,
            'proposal_background' => $proposal_background,
            'vue_design_logo' => $vue_design_logo,
        ])->render();

        Browsershot::html($html)
        ->format('Letter')
        ->save('storage/invoices/invoice.pdf');

        return $html;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
