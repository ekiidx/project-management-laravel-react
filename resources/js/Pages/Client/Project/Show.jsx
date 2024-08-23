import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link } from "@inertiajs/react";
// import TasksTable from "../Task/TasksTable";

export default function Show({ auth, success, project, tasks, if_tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    {`Project "${project.project_name}"`}
                </h2>
            }
        >
            <Head title={`Project "${project.project_name}"`} />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="mb-2">
                            <img
                                src={project.image_path}
                                alt=""
                                className="rounded-lg w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="grid gap-1 grid-cols-2">
                                <div className="mb-4">
                                    <div className="mb-4">
                                        <label className="font-bold text-lg">Project ID</label>
                                        <p className="mt-1'">{project.id}</p>
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-bold text-lg">Project Status</label>
                                        <p className="mt-1">
                                        <span 
                                            className={"px-2 py-1 rounded text-white font-bold " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                                        </span>
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1">{project.created_by}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="mb-4">
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className="mt-1">{project.due_date}</p>
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-bold text-lg">Created Date</label>
                                        <p className="mt-1">{project.created_at}</p>
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p className="mt-1">{project.updated_by}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Project Description</label>
                                    <p className="mt-1">{project.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div className="flex justify-between items-center">
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                    Tasks
                                </h2>
                                <Link href={route("task.create")} className="bg-emerald-500 py-1 px-3 text-white font-bold rounded shadow transition-all hover:bg-emerald-600">
                                    New Task
                                </Link>
                            </div>
                            { if_tasks && 
                            <TasksTable
                                tasks={tasks}
                                success={success}
                                queryParams={queryParams} 
                            /> }
                        </div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    )
} 