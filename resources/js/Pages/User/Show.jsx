import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import { Head, Link, router } from "@inertiajs/react";
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants.jsx";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
// import TasksTable from "../Task/TasksTable";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import TableHeading from "@/Components/TableHeading";

// export default function Show({ auth, user, tasks, queryParams }) {
export default function Show({ auth, user, projects, queryParams = null }) {

  queryParams = queryParams || {}
  const searchFieldChanged = (name, value ) => {
      if(value) {
          queryParams[name] = value
      }else {
          delete queryParams[name]
      }
      router.get(route('project.index'), queryParams);
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
      router.get(route('project.index'), queryParams);
  };

  const deleteProject = (project) => {
      if (!window.confirm("Are you sure you want to delete the project?")) {
        return;
      }
      router.delete(route("project.destroy", project.id));
    };

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {`User "${user.name}"`}
            </h2>
        }
      >
        <Head title={`User "${user.name}"`} />
        <div className="py-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div>
                {/* <img
                  src={user.image_path}
                  alt=""
                  className="w-full h-64 object-cover"
                /> */}
              </div>
              <div className="p-6 text-gray-900">
                <div className="grid gap-1 grid-cols-2 mt-2">
                  <div>
                    <div>
                      <label className="font-bold text-lg">Client ID</label>
                      <p className="mt-1">{user.id}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Name</label>
                      <p className="mt-1">{user.name}</p>
                    </div>
  
                    <div className="mt-4">
                      <label className="font-bold text-lg">Status</label>
                      <p className="mt-1">
                        <span
                          className={
                            "px-2 py-1 rounded text-white " +
                            USER_STATUS_CLASS_MAP[user.status]
                          }
                        >
                          {USER_STATUS_TEXT_MAP[user.status]}
                        </span>
                      </p>
                    </div>
                    {/* <div className="mt-4">
                      <label className="font-bold text-lg">Created By</label>
                      <p className="mt-1">{user.createdBy.name}</p>
                    </div> */}
                  </div>
                  {/* <div>
                    <div>
                      <label className="font-bold text-lg">Due Date</label>
                      <p className="mt-1">{user.due_date}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Create Date</label>
                      <p className="mt-1">{user.created_at}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Updated By</label>
                      <p className="mt-1">{user.updatedBy.name}</p>
                    </div>
                  </div> */}
                </div>
  
                <div className="mt-4">
                  <label className="font-bold text-lg">User Description</label>
                  <p className="mt-1">{user.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

         <div className="pb-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">

                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Projects
                    </h2>
                    <Link href={route('project.create_with_id', user.id)} className="bg-emerald-500 py-1 px-3 text-white font-bold rounded shadow transition-all hover:bg-emerald-600">
                        New Project
                    </Link>
                </div>
                {/* <TasksTable
                  tasks={tasks}
                  queryParams={queryParams}
                  hideUserColumn={true}
                /> */}

                {/* {projects.map(project => (
                  <div key={project.id}>
                    {project.project_name}
                    {project.client_name}
                  </div>
                ))} */}

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
                      {projects.map(project => (
                          <tr key={project.id} className="border-b">
                              <td className="px-3 py-2">
                                  <img src={project.image_path} style={{width: 60}} alt="" />
                              </td>
                              <td className="px-3 py-2 hover:underline text-nowrap">
                                  <Link href={route('project.show', project.id)}>
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
                                  <Link href={route('user.show', project.user_id)}>
                                      {project.created_by}
                                  </Link>
                              </td>
                              <td className="px-3 py-2">
                                  <Link 
                                      href={route('project.edit', project.id)} className="font-medium text-blue-600 hover:underline mx-1"
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
                {/* <Pagination links={projects.meta.links} /> */}

              </div>
            </div>
          </div>
        </div>

        <div className="pb-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">

                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Proposals
                    </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">

                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Invoices
                    </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
}