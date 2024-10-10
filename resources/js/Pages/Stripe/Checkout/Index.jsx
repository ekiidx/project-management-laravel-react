import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Customers({ auth, client_secret }) {
    //const userRole = auth.user.role;

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Stripe Checkout</h2>
            </div>
            }
        >

            <Head title="Stripe Checkout" />
            <script src="https://js.stripe.com/v3/"></script>
            <script src="/assets/js/checkout.js" defer></script>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}

                            {/* Display a payment form */}
                            <div id="checkout">
                                {/* Checkout will insert the payment form here */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}