import React, { useRef } from 'react';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import Multiselect from 'multiselect-react-dropdown';

interface FormValues {
  firstName: string;
  email: string;
  gender: string;
  terms: boolean;
  options: string[];
}
interface Option {
    name:string;
}

// Define the initial values
const initialValues: FormValues = {
  firstName: '',
  email: '',
  gender: '',
  terms: false,
  options: [],
};

// Define the validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Please enter your first name'),
  email: Yup.string().email('Invalid email address').required('Please enter a valid email address'),
  gender: Yup.string().required('Please select your gender'),
  terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  options: Yup.array().min(1, 'At least one option must be selected').required('Required'),
});

const UncontrolledFormikForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const formik: FormikProps<FormValues> = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      if (formRef.current) {
        const formElements = formRef.current.elements as any;
        const selectedOptions = Array.from(formElements.options.selectedOptions).map(
            (option: unknown) => (option as HTMLOptionElement).value
          );
        const formValues: FormValues = {
          firstName: formElements.firstName.value,
          email: formElements.email.value,
          gender: formElements.gender.value,
          terms: formElements.terms.checked,
          options: selectedOptions,
        };
        console.log(formValues);
        formik.resetForm();
        formRef.current.reset();
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form ref={formRef} onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30%]">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <p className="mt-2 text-sm text-red-600">{formik.errors.firstName}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium " htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
          ) : null}
        </div>

        <fieldset className="flex flex-col gap-2 mb-4">
          <legend className="sr-only">Gender</legend>
          <div>
            <input
              id="gender-male"
              type="radio"
              name="gender"
              value="male"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="gender-male" className="ml-2 text-sm font-medium text-gray-700">Male</label>
          </div>
          <div>
            <input
              id="gender-female"
              type="radio"
              name="gender"
              value="female"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="gender-female" className="ml-2 text-sm font-medium text-gray-700">Female</label>
          </div>
          {formik.touched.gender && formik.errors.gender ? (
            <p className="mt-2 text-sm text-red-600">{formik.errors.gender}</p>
          ) : null}
        </fieldset>

        <div className="mb-4">
          <Multiselect
            options={[
              { name: 'Option 1', id: 1 },
              { name: 'Option 2', id: 2 },
              { name: 'Option 3', id: 3 },
              { name: 'Option 4', id: 4 },
            ]}
            displayValue="name"
            onSelect={(selectedList) => {
              formik.setFieldValue('options', selectedList.map((option: Option) => option.name));
            }}
            onRemove={(selectedList) => {
              formik.setFieldValue('options', selectedList.map((Option:Option)=>Option.name));
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.options && formik.errors.options ? (
            <p className="mt-2 text-sm text-red-600">{formik.errors.options}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="terms"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span className="ml-2">I accept the terms and conditions</span>
          </label>
          {formik.touched.terms && formik.errors.terms ? (
            <p className="mt-2 text-sm text-red-600">{formik.errors.terms}</p>
          ) : null}
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UncontrolledFormikForm;
