import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, proposals, success }) {
    const userRole = auth.user.role

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl leading-tight">
                        Proposals
                    </h2>

                    {userRole === 'admin' && 
                        <Link href={route("proposals.create")} className="bg-emerald-500 py-1 px-3 text-white font-bold rounded shadow transition-all hover:bg-emerald-600">
                        New Proposal
                        </Link>
                    }
                </div>
            }
        >
            <Head title="Proposals" />

            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white font-bold rounded">
                {success}
            </div>
            )}

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {proposals.map(proposal => (
                                <div key={proposal.id} className="border-b">
                                    {proposal.name}<br></br>
                                    {proposal.user_id}<br></br>
                                    {proposal.product_name}<br></br>
                                    {proposal.email}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
} 