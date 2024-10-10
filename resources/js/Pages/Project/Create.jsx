import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from 'react';

export default function Create({ auth }) {

    // const [items, setItems] = useState([]);

    // const handleAddItem = () => {
    //     setItems([...items, `Item ${items.length + 1}`]);
    //   };

    const [options] = useState([
        { value: null, label: 'Select Product' },
        { value: 1, label: 'Event Flyer' },
        { value: 2, label: 'Event Banner' },
        { value: 3, label: 'Event Spotlights (6)' },
      ]);
    
      const [selectedValues, setSelectedValues] = useState([]);
    
      const handleAddSelect = () => {
        setSelectedValues([...selectedValues, '']);
        console.log(selectedValues)
      };
    
      const handleSelectChange = (index, value) => {
        const newSelectedValues = [...selectedValues];
        newSelectedValues[index] = value;
        setSelectedValues(newSelectedValues);
        setData('products', newSelectedValues);
        console.log(newSelectedValues)
      };
    
      const handleRemoveSelect = (index) => {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.splice(index, 1);
        setSelectedValues(newSelectedValues);
        setData('products', newSelectedValues);
        console.log(newSelectedValues)
      };

    const {data, setData, post, errors, reset} = useForm({
        project_name: '',
        user_id: '',
        product_name: '',
        stripe_payment_link: '',
        status: 'pending',
        description: '',
        start_date: '',
        due_date: '',
        project_image: '',
        products: ''
    })



    // const addField = () => {
    //     setFields([...fields, { value: '' }]);
    // };
    
    // const removeField = () => {
    //     if (fields.length > 1) {
    //     setFields(fields.slice(0, -1));
    //     }
    // };



    // const [fields, setFields] = useState([{ products: '', email: '' }]);
    
    // const handleFieldChange = (index, fieldName, value) => {
    //     const newFields = [...fields];
    //     newFields[index][fieldName] = value;
    //     setFields(newFields);
    // };
    
    // const addField = () => {
    //     setFields([...fields, { name: '', email: '' }]);
    // };
    
    // const removeField = (index) => {
    //     const newFields = [...fields];
    //     newFields.splice(index, 1);
    //     setFields(newFields);
    // };

   

    //   setData('products', selectedValues);
    
    const onSubmit = (e) => {
        e.preventDefault();
        // const formData = [];
        // selectedValues.forEach((item, index) => {
        //     item.value =+ formData;
        // //   formData =+ selectedValues[index].value;
        //   console.log(formData);
        // });

        setData('products', selectedValues);

        console.log(selectedValues);

        post(route('projects.store'));
    }

    return(
        <AuthenticatedLayout 
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Project</h2>

            </div>
            }
        >

            <Head title="Create New Project" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {selectedValues}

                        <form 
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <div className="mb-4">
                                <InputLabel htmlFor="project_name" value="Project Name" />
                                <TextInput
                                    id="project_name"
                                    type="text"
                                    name="project_name"
                                    value={data.project_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("project_name", e.target.value)} />
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

                            <div>
                                {selectedValues.map((value, index) => (
                                    <div key={index}>
                                    <select value={value} onChange={(e) => handleSelectChange(index, e.target.value)}>
                                        {options.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                        ))}
                                    </select>
                                    <p onClick={() => handleRemoveSelect(index)}>Remove</p>
                                    </div>
                                ))}
                                <p onClick={handleAddSelect}>Add Select</p>
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="project_description" value="Project Description" />
                                <TextAreaInput
                                    id="project_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)} />
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
                            <div className="mb-4">
                                <InputLabel htmlFor="project_status" value="Project Status" />
                                <SelectInput
                                    name="status"
                                    id="project_status"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("status", e.target.value)} >

                                    <option value="pending">Pending Payment</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError message={errors.project_status} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <InputLabel htmlFor="project_image" value="Project Image" />
                                <TextInput
                                    id="project_image"
                                    type="file"
                                    name="project_image"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('project_image', e.target.files[0])} />
                                <InputError message={errors.project_image} className="mt-2" />
                            </div>
                            <div className="text-right">
                                <Link className="bg-gray-100 py-1 px-3 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white font-bold rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}