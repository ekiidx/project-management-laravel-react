import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants.jsx";
// import TasksTable from "../Task/TasksTable";

// export default function Show({ auth, user, tasks, queryParams }) {
export default function Show({ auth, user }) {
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
              <div className="p-6 text-gray-900 dark:text-gray-100">

                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Projects
                    </h2>
                    <Link href={route('projects.create', user.id)} className="bg-emerald-500 py-1 px-3 text-white font-bold rounded shadow transition-all hover:bg-emerald-600">
                        New Project
                    </Link>
                </div>
                {/* <TasksTable
                  tasks={tasks}
                  queryParams={queryParams}
                  hideUserColumn={true}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
}