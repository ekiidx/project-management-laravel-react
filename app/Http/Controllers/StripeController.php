<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StripeController extends Controller
{
    public function customers()
    {
        $stripe = new \Stripe\StripeClient('sk_test_51JMHhJC25ihSyzVGGR2RwsNsWfdslWmNr1hUN31cXhtgQ1ggfyx0isFmfIr1MDayQkKAy2BF0Qs0jFY6kcY7qA7c00IErUegvK');

        $customers = $stripe->customers->all(['limit' => 10]);

        return inertia('Stripe/Customers/Index', [
            'customers' => $customers
        ]);
    }

    public function products()
    {
        $YOUR_DOMAIN = 'http://localhost:8000';
        $stripe = new \Stripe\StripeClient('sk_test_51JMHhJC25ihSyzVGGR2RwsNsWfdslWmNr1hUN31cXhtgQ1ggfyx0isFmfIr1MDayQkKAy2BF0Qs0jFY6kcY7qA7c00IErUegvK');

        $stripe->checkout->sessions->create([
            'ui_mode' => 'embedded',
          'line_items' => [
            [
              'price' => 'price_1OBC83C25ihSyzVGtnbkypyM',
              'quantity' => 1,
            ],
          ],
          'mode' => 'payment',
          'return_url' => $YOUR_DOMAIN . '/success?session_id={CHECKOUT_SESSION_ID}',
        ]);

    }

    public function checkout()
    {
        // $stripeSecretKey = 'sk_test_51JMHhJC25ihSyzVGGR2RwsNsWfdslWmNr1hUN31cXhtgQ1ggfyx0isFmfIr1MDayQkKAy2BF0Qs0jFY6kcY7qA7c00IErUegvK';
        // $stripe = new \Stripe\StripeClient($stripeSecretKey);
       
        return inertia('Stripe/Checkout/Index');
    }
}