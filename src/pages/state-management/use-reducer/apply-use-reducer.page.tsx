import React, { useReducer } from 'react';
import 'tailwindcss/tailwind.css';

// Define initial states
const initialState = {
  text: { value: '', error: '' },
  email: { value: '', error: '' },
  password: { value: '', error: '' },
  number: { value: '', error: '' },
  checkbox: { value: false, error: '' },
  radio: { value: '', error: '' },
  textarea: { value: '', error: '' },
  select: { value: '', error: '' },
  date: { value: '', error: '' },
  color: { value: '#000000', error: '' },
};

// Reducer functions
const inputReducer = (state: any, action: any) => {
  const { name, value } = action.payload;
  let error = '';

  switch (name) {
    case 'text':
      error = value ? '' : 'Text is required';
      break;
    case 'email':
      error = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email';
      break;
    case 'password':
      error = value.length >= 6 ? '' : 'Password must be at least 6 characters';
      break;
    case 'number':
      error = !isNaN(value) ? '' : 'Must be a number';
      break;
    case 'textarea':
      error = value ? '' : 'Textarea is required';
      break;
    case 'select':
      error = value ? '' : 'Select is required';
      break;
    case 'date':
      error = value ? '' : 'Date is required';
      break;
    case 'checkbox':
    case 'radio':
    case 'color':
    default:
      break;
  }

  return {
    ...state,
    [name]: { value, error },
  };
};

// Generic dispatch function
const useFormReducer = (initialState: any) => {
  const [state, dispatch] = useReducer(inputReducer, initialState);
  const setValue = (name: string, value: string) => {
    dispatch({ type: 'SET_VALUE', payload: { name, value } });
  };
  return [state, setValue];
};

export default function UseReducerForm() {
  const [state, setValue] = useFormReducer(initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form data:', state);
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen">
      <div className="md:w-1/2 p-4">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md" autoComplete='off'>
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <input
              type="text"
              value={state.text.value}
              onChange={(e) => setValue('text', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {state.text.error && <p className="text-red-500 text-xs">{state.text.error}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={state.email.value}
              onChange={(e) => setValue('email', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {state.email.error && <p className="text-red-500 text-xs">{state.email.error}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={state.password.value}
              onChange={(e) => setValue('password', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {state.password.error && <p className="text-red-500 text-xs">{state.password.error}</p>}
          </div>

          {/* Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Number</label>
            <input
              type="number"
              value={state.number.value}
              onChange={(e) => setValue('number', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {state.number.error && <p className="text-red-500 text-xs">{state.number.error}</p>}
          </div>

          {/* Checkbox */}
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={state.checkbox.value}
                onChange={(e) => setValue('checkbox', e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2">Checkbox</span>
            </label>
          </div>

          {/* Radio Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Radio</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radio"
                  value="option1"
                  checked={state.radio.value === 'option1'}
                  onChange={(e) => setValue('radio', e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span className="ml-2">Option 1</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radio"
                  value="option2"
                  checked={state.radio.value === 'option2'}
                  onChange={(e) => setValue('radio', e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span className="ml-2">Option 2</span>
              </label>
            </div>
          </div>

          {/* Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Textarea</label>
            <textarea
              value={state.textarea.value}
              onChange={(e) => setValue('textarea', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              rows={3}
            ></textarea>
            {state.textarea.error && <p className="text-red-500 text-xs">{state.textarea.error}</p>}
          </div>

          {/* Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select</label>
            <select
              value={state.select.value}
              onChange={(e) => setValue('select', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            {state.select.error && <p className="text-red-500 text-xs">{state.select.error}</p>}
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={state.date.value}
              onChange={(e) => setValue('date', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {state.date.error && <p className="text-red-500 text-xs">{state.date.error}</p>}
          </div>

          {/* Color Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="color"
              value={state.color.value}
              onChange={(e) => setValue('color', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="md:w-1/2 p-4">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-medium">Form Data</h2>
          <pre className="mt-4 bg-gray-100 p-4 rounded">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
