import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableHeading from "@/Components/TableHeading";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import Pagination from "@/Components/Pagination";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, invoices, queryParams = null, success }) {
    const userRole = auth.user.role;
    // normalize queryParams - will always be something (an object)
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value ) => {
        if(value) {
            queryParams[name] = value
        }else {
            delete queryParams[name]
        }
        router.get(route('invoices.index'), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if(queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc'
            }else {
                queryParams.sort_direction = 'asc'
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('invoices.index'), queryParams);
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoices</h2>

                {userRole === 'admin' && 
                    <Link href={route("projects.create")} className="bg-emerald-500 py-1 px-3 text-white font-bold rounded shadow transition-all hover:bg-emerald-600">
                        Add New
                    </Link>
                }

            </div>
            }
        >

            <Head title="Invoices" />

            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white font-bold rounded">
                {success}
            </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}

                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className="text-xs uppercase">
                                    <tr className="text-nowrap">
                                        <TableHeading 
                                            name="project_name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Name
                                        </TableHeading>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map(invoice => (
                                        <tr key={invoice.id} className="border-b">
                                            <td className="px-3 py-2 hover:underline text-nowrap">
                                                <Link href={route('invoices.show', invoice.id)}>
                                                    {invoice.client_name}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}