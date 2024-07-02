import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function Index({ auth, tasks, queryParams = null }) {
    // queryParams will always be something (an object)
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value ) => {
        if(value) {
            queryParams[name] = value
        }else {
            delete queryParams[name]
        }
        router.get(route('task.index'), queryParams);
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
        router.get(route('task.index'), queryParams);
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}
        >

            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre> */}

                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className="text-xs uppercase">
                                    <tr className="text-nowrap">
                                        <th onClick={e => sortChanged('id')}>
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                ID
                                                <div>              
                                                    <ChevronUpIcon className={
                                                        'w-4 ' + 
                                                        (queryParams.sort_field === 'id' && 
                                                        queryParams.sort_direction === 'asc' ?
                                                        'text-orange-400' : '')} />
                                                    <ChevronDownIcon className={
                                                        'w-4 -mt-2 ' +
                                                        (queryParams.sort_field === 'id' && 
                                                        queryParams.sort_direction === 'desc' ?
                                                        'text-orange-400' : '')} />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-3">Image</th>
                                        <th onClick={e => sortChanged('name')}>
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Name
                                                <div>              
                                                    <ChevronUpIcon className={
                                                        'w-4 ' + 
                                                        (queryParams.sort_field === 'name' && 
                                                        queryParams.sort_direction === 'asc' ?
                                                        'text-orange-400' : '')} />
                                                    <ChevronDownIcon className={
                                                        'w-4 -mt-2 ' +
                                                        (queryParams.sort_field === 'name' && 
                                                        queryParams.sort_direction === 'desc' ?
                                                        'text-orange-400' : '')} />
                                                </div>
                                            </div>
                                        </th>
                                        <th onClick={e => sortChanged('status')}>
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Status
                                                <div>              
                                                    <ChevronUpIcon className={
                                                        'w-4 ' + 
                                                        (queryParams.sort_field === 'status' && 
                                                        queryParams.sort_direction === 'asc' ?
                                                        'text-orange-400' : '')} />
                                                    <ChevronDownIcon className={
                                                        'w-4 -mt-2 ' +
                                                        (queryParams.sort_field === 'status' && 
                                                        queryParams.sort_direction === 'desc' ?
                                                        'text-orange-400' : '')} />
                                                </div>
                                            </div>
                                        </th>
                                        <th onClick={e => sortChanged('created_at')}>
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Create Date
                                                <div>              
                                                    <ChevronUpIcon className={
                                                        'w-4 ' + 
                                                        (queryParams.sort_field === 'created_at' && 
                                                        queryParams.sort_direction === 'asc' ?
                                                        'text-orange-400' : '')} />
                                                    <ChevronDownIcon className={
                                                        'w-4 -mt-2 ' +
                                                        (queryParams.sort_field === 'created_at' && 
                                                        queryParams.sort_direction === 'desc' ?
                                                        'text-orange-400' : '')} />
                                                </div>
                                            </div>
                                        </th>
                                        <th onClick={e => sortChanged('due_date')} className="px-3 py-3">
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Due Date  
                                                <div>              
                                                    <ChevronUpIcon className={
                                                        'w-4 ' + 
                                                        (queryParams.sort_field === 'due_date' && 
                                                        queryParams.sort_direction === 'asc' ?
                                                        'text-orange-400' : '')} />
                                                    <ChevronDownIcon className={
                                                        'w-4 -mt-2 ' +
                                                        (queryParams.sort_field === 'due_date' && 
                                                        queryParams.sort_direction === 'desc' ?
                                                        'text-orange-400' : '')} />
                                                </div>
                                            </div> 
                                        </th>
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
                                                defaultValue={queryParams.name}
                                                placeholder="task Name" 
                                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)} 
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
                                    {tasks.data.map(task => (
                                        <tr key={task.id} className="border-b">
                                            <td className="px-3 py-2">{task.id}</td>
                                            <td className="px-3 py-2">
                                                <img src={task.image_path} style={{width: 60}} alt="" />
                                            </td>
                                            <td className="px-3 py-2">{task.name}</td>
                                            <td className="px-3 py-2">
                                                <span 
                                                    className={"px-2 py-1 rounded text-white font-bold " + TASK_STATUS_CLASS_MAP[task.status]}>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                            <td className="px-3 py-2">{task.createdBy.name}</td>
                                            <td className="px-3 py-2">
                                                <Link 
                                                    href={route('task.edit', task.id)} className="font-medium text-blue-600 hover:underline mx-1"
                                                >
                                                    Edit 
                                                </Link>
                                                <Link 
                                                    href={route('task.destroy', task.id)} className="font-medium text-red-600 hover:underline mx-1"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}