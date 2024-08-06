import Multiselect from 'multiselect-react-dropdown';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface FormValues {
  firstName: string;
  email: string;
  gender: string;
  terms: boolean;
  options: string[];
}

interface Option {
  name: string;
}

export default function HookFormControlled() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      email: '',
      gender: '',
      terms: false,
      options: [],
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30%]"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            id="firstName"
            {...register('firstName', {
              required: 'Please enter your first name',
              maxLength: {
                value: 15,
                message: 'Must be 15 characters or less',
              },
            })}
            type="text"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            {...register('email', {
              required: 'Please enter a valid email address',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            type="email"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <fieldset className="flex flex-col gap-2 mb-4">
          <legend className="sr-only">Gender</legend>
          <div>
            <input
              id="gender-male"
              type="radio"
              value="male"
              {...register('gender', { required: 'Please select your gender' })}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label
              htmlFor="gender-male"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Male
            </label>
          </div>
          <div>
            <input
              id="gender-female"
              type="radio"
              value="female"
              {...register('gender', { required: 'Please select your gender' })}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label
              htmlFor="gender-female"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="mt-2 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </fieldset>

        <div className="mb-4">
          <Controller
            name="options"
            control={control}
            rules={{
              validate: (value) =>
                value.length > 0 || 'At least one option must be selected',
            }}
            render={({ field }) => (
              <Multiselect
                options={[
                  { name: 'Option 1', id: 1 },
                  { name: 'Option 2', id: 2 },
                  { name: 'Option 3', id: 3 },
                  { name: 'Option 4', id: 4 },
                ]}
                displayValue="name"
                selectedValues={field.value}
                onSelect={(selectedList) =>
                  field.onChange(
                    selectedList.map((option: Option) => option.name),
                  )
                }
                onRemove={(selectedList) =>
                  field.onChange(
                    selectedList.map((option: Option) => option.name),
                  )
                }
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.options && (
            <p className="mt-2 text-sm text-red-600">
              {errors.options.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              {...register('terms', {
                required: 'You must accept the terms and conditions',
              })}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span className="ml-2">I accept the terms and conditions</span>
          </label>
          {errors.terms && (
            <p className="mt-2 text-sm text-red-600">{errors.terms.message}</p>
          )}
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
}
