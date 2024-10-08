import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null, success }) {
    const userRole = auth.user.role
    // normalize queryParams - will always be something (an object)
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value ) => {
        if(value) {
            queryParams[name] = value
        }else {
            delete queryParams[name]
        }
        router.get(route('projects.index'), queryParams);
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
        router.get(route('projects.index'), queryParams);
    };

    const deleteProject = (project) => {
        if (!window.confirm("Are you sure you want to delete the project?")) {
          return;
        }
        router.delete(route("projects.destroy", project.id));
      };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>

                {userRole === 'admin' && 
                    <Link href={route("projects.create")} className="bg-emerald-500 py-1 px-3 text-white font-bold rounded shadow transition-all hover:bg-emerald-600">
                    New Project
                    </Link>
                }
            
            </div>
            }
        >

            <Head title="Projects" />
            
            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white font-bold rounded">
                {success}
            </div>
            )}

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}

                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className="text-xs uppercase">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">Image</th>
                                        <TableHeading 
                                            name="project_name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Name
                                        </TableHeading>
                                        <TableHeading 
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Status
                                        </TableHeading>
                                        <TableHeading 
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Create Date
                                        </TableHeading>
                                        <TableHeading 
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Due Date
                                        </TableHeading>
                                        <th onClick={e => sortChanged('created_by')} className="px-3 py-3">
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Created By
                                                <div>              
                                                    <ChevronUpIcon className={
                                                        'w-4 ' + 
                                                        (queryParams.sort_field === 'created_by' && 
                                                        queryParams.sort_direction === 'asc' ?
                                                        'text-orange-400' : '')} />
                                                    <ChevronDownIcon className={
                                                        'w-4 -mt-2 ' +
                                                        (queryParams.sort_field === 'created_by' && 
                                                        queryParams.sort_direction === 'desc' ?
                                                        'text-orange-400' : '')} />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs uppercase">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput 
                                                className="w-full"
                                                defaultValue={queryParams.project_name}
                                                placeholder="Project Name" 
                                                onBlur={e => searchFieldChanged('project_name', e.target.value)}
                                                onKeyPress={e => onKeyPress('project_name', e)} 
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput 
                                                className="w-full"
                                                defaultValue={queryParams.status}
                                                onChange={e => searchFieldChanged('status', e.target.value)}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map(project => (
                                        <tr key={project.id} className="border-b">
                                            <td className="px-3 py-2">
                                                <img src={project.project_image} alt="" />
                                            </td>
                                            <td className="px-3 py-2 hover:underline text-nowrap">
                                                <Link href={route('projects.show', project.id)}>
                                                    {project.project_name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span 
                                                    className={"px-2 py-1 rounded text-white font-bold " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                                            <td className="px-3 py-2">
                                                <Link href={route('users.show', project.user_id)}>
                                                    {project.created_by}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2">
                                                <Link 
                                                    href={route('projects.edit', project.id)} className="font-medium text-blue-600 hover:underline mx-1"
                                                >
                                                    Edit 
                                                </Link>
                                                <button
                                                    onClick={(e) => deleteProject(project)}
                                                    className="font-medium text-red-600
                                                    hover:underline mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}