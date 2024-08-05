import React, { useRef, useEffect, useState } from 'react';
import * as Yup from 'yup';
import Multiselect from 'multiselect-react-dropdown';



interface Option {
    name: string;
    id: number,
}
// Define your Yup schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter your first name')
    .max(15, 'Must be 15 characters or less'),
  email: Yup.string()
    .required('Please enter a valid email address')
    .matches(/^\S+@\S+$/, 'Invalid email address'),
  gender: Yup.string().required('Please select your gender'),
  options: Yup.array().of(Yup.string()).required('At least one option must be selected').min(1),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const HookUncontrolled: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const maleGenderRef = useRef<HTMLInputElement>(null);
  const femaleGenderRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  useEffect(() => {
    
    if (firstNameRef.current) {
      firstNameRef.current.value = ''; 
    }
    if (emailRef.current){
      emailRef.current.value = '';
    };
    if (maleGenderRef.current){
      maleGenderRef.current.checked = false;
    }
    if (femaleGenderRef.current){
      femaleGenderRef.current.checked = false;
    };
    if (termsRef.current){
      termsRef.current.checked = false;
    }
    setSelectedOptions([]);
  }, [errors]);
  
  useEffect(() => {
    // Perform validation when the component mounts
    validateForm();
  }, []);

  const validateForm = async () => {
    const selectedGender = maleGenderRef.current?.checked ? 'male' : (femaleGenderRef.current?.checked ? 'female' : '');

    try {
      await validationSchema.validate({
        firstName: firstNameRef.current?.value,
        email: emailRef.current?.value,
        gender: selectedGender,
        options: selectedOptions,
        terms: termsRef.current?.checked,
      }, { abortEarly: false });
      console.log("Validation passed");
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errObj: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errObj[err.path] = err.message;
          }
        });
        setErrors(errObj);
        console.error(errObj);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={(e) => {
        e.preventDefault();
        validateForm();
      }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30%]">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            ref={firstNameRef}
            id="firstName"
            type="text"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <fieldset className="flex flex-col gap-2 mb-4">
          <legend className="sr-only">Gender</legend>
          <div>
            <input
              ref={maleGenderRef}
              id="gender-male"
              type="radio"
              name="gender"
              value="male"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="gender-male" className="ml-2 text-sm font-medium text-gray-700">
              Male
            </label>
          </div>
          <div>
            <input
              ref={femaleGenderRef}
              id="gender-female"
              type="radio"
              name="gender"
              value="female"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="gender-female" className="ml-2 text-sm font-medium text-gray-700">
              Female
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender}</p>}
        </fieldset>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
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
            selectedValues={selectedOptions.map(option => ({ name: option, id: 1 }))}
            onSelect={(selectedList: Option[]) => setSelectedOptions(selectedList.map(option => option.name))}
            onRemove={(selectedList: Option[]) => setSelectedOptions(selectedList.map(option => option.name))}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.options && <p className="mt-2 text-sm text-red-600">{errors.options}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            <input
              ref={termsRef}
              type="checkbox"
              id="terms"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span className="ml-2">I accept the terms and conditions</span>
          </label>
          {errors.terms && <p className="text-red-500 text-xs italic">{errors.terms}</p>}
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

export default HookUncontrolled;
