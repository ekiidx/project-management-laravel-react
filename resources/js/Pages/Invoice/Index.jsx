import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth }) {

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoices</h2>
                <Link href={route("project.create")} className="bg-emerald-500 py-1 px-3 text-white font-bold rounded shadow transition-all hover:bg-emerald-600">
                    Add New
                </Link>
            </div>
            }
        >

            <Head title="Invoices" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}