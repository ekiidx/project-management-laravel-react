import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";

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

export default function TasksTable({ tasks, queryParams }) {
    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs uppercase">
                    <tr className="text-nowrap">
                        <TableHeading 
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            ID
                        </TableHeading>
                        <th className="px-3 py-3">Image</th>
                        <TableHeading 
                            name="name"
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
                            name="create_date"
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
                                defaultValue={queryParams.name}
                                placeholder="Task Name" 
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
                            <td className="px-3 py-2 hover:underline text-nowrap">
                                <Link href={route('task.show', task.id)}>
                                    {task.name}
                                </Link>
                            </td>
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
        </>
    )
}