import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const {data, setData, post, errors, reset} = useForm({
        client_name: '',
        user_id: '',
        product_name: '',
        client_email: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('proposals.store'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl leading-tight">
                        Proposals
                    </h2>
                </div>
            }
        >
            <Head title={"Proposals"} />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
               
                        <form 
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <div className="mb-4">
                                <InputLabel htmlFor="client_name" value="Client Name" />
                                <TextInput
                                    id="client_name"
                                    type="text"
                                    name="client_name"
                                    value={data.client_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("client_name", e.target.value)} />
                                <InputError message={errors.client_name} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <InputLabel htmlFor="user_id" value="Client ID" />
                                <TextInput
                                    id="user_id"
                                    type="number"
                                    name="user_id"
                                    value={data.user_id}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("user_id", e.target.value)} />
                                <InputError message={errors.user_id} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <InputLabel htmlFor="product_name" value="Product Name" />
                                <TextInput
                                    id="product_name"
                                    type="text"
                                    name="product_name"
                                    value={data.product_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("product_name", e.target.value)} />
                                <InputError message={errors.product_name} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <InputLabel htmlFor="stripe_payment_link" value="Stripe Payment Link" />
                                <TextInput
                                    id="srtipe_payment_link"
                                    type="url"
                                    name="stripe_payment_link"
                                    value={data.stripe_payment_link}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("stripe_payment_link", e.target.value)} />
                                <InputError message={errors.stripe_payment_link} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <InputLabel htmlFor="client_email" value="Client Email" />
                                <TextInput
                                    id="client_email"
                                    type="email"
                                    name="client_email"
                                    value={data.client_email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("client_email", e.target.value)} />
                                <InputError message={errors.client_email} className="mt-2" />
                            </div>
                            <div className="text-right">
                                <Link className="bg-gray-100 py-1 px-3 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white font-bold rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
} 