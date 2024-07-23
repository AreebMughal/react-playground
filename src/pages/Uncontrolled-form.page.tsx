import React, { useRef, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const UnControlledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const optionRef1 = useRef<HTMLInputElement>(null);
  const optionRef2 = useRef<HTMLInputElement>(null);
  const agreeRef = useRef<HTMLInputElement>(null);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const agree = agreeRef.current?.checked;

    const newErrors: { [key: string]: string } = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!agree) {
      newErrors.agree = "You must agree to the terms";
    }
    if (!(optionRef1.current?.checked || optionRef2.current?.checked)) {
      newErrors.option = "select atleast one option";
    }
    if (selectedOptions.length === 0) {
      newErrors.multiselect = "At least one option must be selected";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (optionRef1.current) optionRef1.current.checked = false;
      if (optionRef2.current) optionRef2.current.checked = false;
      if (agreeRef.current) agreeRef.current.checked = false;
      setSelectedOptions([]);
    }
  };
 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30%]">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            ref={nameRef}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
            id="name"
            type="text"
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            ref={emailRef}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            id="email"
            type="email"
            placeholder="Enter Your Email"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="option1">
              Option 1
              <input ref={optionRef1} className="leading-tight ml-2" id="option1" type="radio" name="option" value="Option1" />
            </label>
          </div>
         
          <div className="w-full flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="option2">
              Option 2
              <input ref={optionRef2} className="leading-tight ml-2" id="option2" type="radio" name="option" value="Option2" />
            </label>
          </div>
         
        </div>
        {errors.option && <p className="text-red-500 text-xs italic text-center">{errors.option}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="multiSelect">
            Select Options
          </label>
          <Multiselect
            options={[
              { name: 'Option 1', id: 1 },
              { name: 'Option 2', id: 2 },
              { name: 'Option 3', id: 3 },
              { name: 'Option 4', id: 4 },
            ]}
            displayValue="name"
            className={`w-full ${errors.multiselect ? 'border border-red-500' : ''}`}
            selectedValues={selectedOptions}
            onSelect={(options) => setSelectedOptions(options)}
            onRemove={(options) => setSelectedOptions(options)}
          />
          {errors.multiselect && <p className="text-red-500 text-xs italic">{errors.multiselect}</p>}
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agree">
              <input ref={agreeRef} className="leading-tight mr-2" id="agree" type="checkbox" name="agree" />
              Agree to terms
              {errors.agree && <p className="text-red-500 text-xs italic">{errors.agree}</p>}
            </label>
          
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnControlledForm;
