import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({ auth, success, tasks, queryParams = null }) {
    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tasks
                    </h2>
                    <Link
                        href={route("task.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }>

            <Head title="Tasks" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre> */}
                            <TasksTable 
                                tasks={tasks} 
                                queryParams={queryParams}
                                success={success} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}