import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useForm, FieldApi, FormApi } from '@tanstack/react-form';
import Multiselect from 'multiselect-react-dropdown';

interface FormValues {
  firstName: string;
  email: string;
  gender: string;
  options: string[];
  terms: boolean;
}

interface SelectedItem {
    name: string;
}

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="mt-2 text-sm text-red-600">{field.state.meta.errors.join(', ')}</p>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

const handleSubmitProgrammatically = (value: FormValues) => {
    console.log('Form submitted programmatically:', value);
    // If you need to perform actions based on the formApi, you can do so here
};

export default function TanStackUncontrolled() {
    const firstNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const genderMaleRef = useRef<HTMLInputElement | null>(null);
    const genderFemaleRef = useRef<HTMLInputElement | null>(null);
    const optionsRef = useRef<Multiselect | null>(null);
    const termsRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      email: '',
      gender: '',
      options: [],
      terms: false,
    },
    onSubmit: ({ value }) => {
      handleSubmitProgrammatically(value);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formValues: FormValues = {
        firstName: firstNameRef.current?.value ?? '',
        email: emailRef.current?.value ?? '',
        gender: genderMaleRef.current?.checked ? 'male' : genderFemaleRef.current?.checked ? 'female' : '',
        options: optionsRef.current?.getSelectedItems().map((item: SelectedItem) => item.name) ?? [],
        terms: termsRef.current?.checked ?? false,
    };

    form.handleSubmit();
  };

  return (

<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30%]">
        <div className="mb-4">
            
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            ref={firstNameRef}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            ref={emailRef}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <fieldset className="flex flex-col gap-2 mb-4">
          <legend className="sr-only">Gender</legend>
          <div>
            <input
              id="gender-male"
              name="gender"
              type="radio"
              value="male"
              ref={genderMaleRef}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="gender-male" className="ml-2 text-sm font-medium text-gray-700">
              Male
            </label>
          </div>
          <div>
            <input
              id="gender-female"
              name="gender"
              type="radio"
              value="female"
              ref={genderFemaleRef}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="gender-female" className="ml-2 text-sm font-medium text-gray-700">
              Female
            </label>
          </div>
        </fieldset>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="options">
            Options
          </label>
          <Multiselect
            options={[
              { name: 'Option 1', id: 1 },
              { name: 'Option 2', id: 2 },
              { name: 'Option 3', id: 3 },
              { name: 'Option 4', id: 4 },
            ]}
            displayValue="name"
            ref={optionsRef}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              ref={termsRef}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span className="ml-2">I accept the terms and conditions</span>
          </label>
        </div>

        <form.Subscribe selector={(state) => state}>
          {({ canSubmit, isSubmitting }) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? '...' : 'Submit'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(<TanStackUncontrolled />);
