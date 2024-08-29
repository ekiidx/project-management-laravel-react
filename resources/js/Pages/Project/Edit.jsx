import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, project }) {
  const { data, setData, post, errors, reset } = useForm({
    project_name: project.project_name,
    user_id: project.user_id,
    product_name: project.product_name,
    stripe_payment_link: project.stripe_payment_link,
    status: project.status,
    description: project.description || "",
    start_date: project.start_date,
    due_date: project.due_date || "",
    project_image: project.project_image || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route('projects.update', project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Edit project "{project.project_name}"
          </h2>
        </div>
      }
    >
      <Head title="Edit Project" />

      <div className="py-3">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
            >

              {project.project_image && (
                <div className="mb-4">
                  <img src={project.project_image} className="w-64" />
                </div>
              )}
              <div>
                <InputLabel
                  htmlFor="project_image"
                  value="Project Image"
                />
                <TextInput
                  id="project_image"
                  type="file"
                  name="project_image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("project_image", e.target.files[0])}
                />
                <InputError message={errors.project_image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" />
                <TextInput
                  id="project_name"
                  type="text"
                  name="project_name"
                  value={data.project_name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("project_name", e.target.value)}
                />

                <InputError message={errors.project_name} className="mt-2" />
              </div>
              <div className="mb-4">
                  <InputLabel htmlFor="user_id" value="Client ID" />
                  <TextInput
                      id="user_id"
                      type="number"
                      name="user_id"
                      value={data.user_id}
                      className="mt-1 block w-full"
                      isFocused={true}
                      onChange={(e) => setData("user_id", e.target.value)} />
                  <InputError message={errors.user_id} className="mt-2" />
              </div>
              <div className="mb-4">
                    <InputLabel htmlFor="product_name" value="Product Name" />
                    <SelectInput
                        name="product_name"
                        id="product_name"
                        value={data.product_name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("product_name", e.target.value)} >

                        <option value="">Product Name</option>
                        <option value="event_flyer">Event Flyer - $150</option>
                        <option value="event_flyer_banner">Event Flyer + Banner - $150</option>
                        <option value="event_flyer_banner_spotlights">Event Flyer + Banner + Spotlights - $150</option>
                        <option value="monthly_host">Monthly Hosting Package - $10/month</option>
                        <option value="unlimited_monthly_package">Unlimited Monthly Package - $150/month</option>
                    </SelectInput>
                    <InputError message={errors.product_name} className="mt-2" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="stripe_payment_link" value="Stripe Payment Link" />
                    <TextInput
                        id="stripe_payment_link"
                        type="url"
                        name="stripe_payment_link"
                        value={data.stripe_payment_link}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("stripe_payment_link", e.target.value)} />
                    <InputError message={errors.stripe_payment_link} className="mt-2" />
                </div>
              {/* <div className="mb-4">
                  <InputLabel htmlFor="project_client" value="Client Name" />
                  <TextInput
                      id="client_name"
                      type="text"
                      name="client_name"
                      value={data.client_name}
                      className="mt-1 block w-full"
                      isFocused={true}
                      onChange={(e) => setData("client_name", e.target.value)} />
                  <InputError message={errors.client_name} className="mt-2" />
              </div> */}
              {/* <div className="mb-4">
                  <InputLabel htmlFor="client_email" value="Client Email" />
                  <TextInput
                      id="client_email"
                      type="email"
                      name="client_email"
                      value={data.client_email}
                      className="mt-1 block w-full"
                      isFocused={true}
                      onChange={(e) => setData("client_email", e.target.value)} />
                  <InputError message={errors.client_email} className="mt-2" />
              </div> */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Project Description"
                />
                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div>
                  <InputLabel htmlFor="project_start_date" value="Start Date" />
                  <TextInput
                      id="project_start_date"
                      type="date"
                      name="start_date"
                      value={data.start_date}
                      className="mt-1 block w-full"
                      onChange={(e) => setData("start_date", e.target.value)} />
                  <InputError message={errors.start_date} className="mt-2" />
              </div>
              <div>
                  <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                  <TextInput
                      id="project_due_date"
                      type="date"
                      name="due_date"
                      value={data.due_date}
                      className="mt-1 block w-full"
                      onChange={(e) => setData("due_date", e.target.value)} />
                  <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Project Status" />
                <SelectInput
                  name="status"
                  value={data.status}
                  id="project_status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.project_status} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("projects.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}