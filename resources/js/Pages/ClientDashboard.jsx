import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head } from "@inertiajs/react";
// import TableHeading from "@/Components/TableHeading";

export default function Dashboard({
  auth,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-3">

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            Hello!
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}