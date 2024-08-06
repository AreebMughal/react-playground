import type { FieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import Multiselect from 'multiselect-react-dropdown';
import { createRoot } from 'react-dom/client';

interface FormValues {
  firstName: string;
  email: string;
  gender: string;
  options: string[];
  terms: boolean;
}

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="mt-2 text-sm text-red-600">
          {field.state.meta.errors.join(', ')}
        </p>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

export default function TanStackControlledForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      email: '',
      gender: '',
      options: [],
      terms: false,
    },
    onSubmit: ({ value }) => {
      console.log('Form submitted:', value);
      form.reset();
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30%]"
      >
        <div className="mb-4">
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A first name is required'
                  : value.length > 15
                    ? 'Must be 15 characters or less'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes('error') && 'No "error" allowed in first name'
                );
              },
            }}
          >
            {(field) => (
              <>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={field.name}
                >
                  First Name
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        <div className="mb-4">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'Please enter a valid email address'
                  : !/^\S+@\S+$/.test(value)
                    ? 'Invalid email address'
                    : undefined,
            }}
          >
            {(field) => (
              <>
                <label
                  className="block text-gray-700 text-sm font-medium"
                  htmlFor={field.name}
                >
                  Email Address
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        <fieldset className="flex flex-col gap-2 mb-4">
          <legend className="sr-only">Gender</legend>
          <div>
            <form.Field
              name="gender"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Please select your gender' : undefined,
              }}
            >
              {(field) => (
                <>
                  <input
                    id="gender-male"
                    name="gender"
                    type="radio"
                    value="male"
                    checked={field.state.value === 'male'}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gender-male"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Male
                  </label>
                </>
              )}
            </form.Field>
          </div>
          <div>
            <form.Field
              name="gender"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Please select your gender' : undefined,
              }}
            >
              {(field) => (
                <>
                  <input
                    id="gender-female"
                    name="gender"
                    type="radio"
                    value="female"
                    checked={field.state.value === 'female'}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gender-female"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Female
                  </label>
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>
        </fieldset>

        <div className="mb-4">
          <form.Field
            name="options"
            validators={{
              onChange: ({ value }) =>
                !value || value.length === 0
                  ? 'At least one option must be selected'
                  : undefined,
            }}
          >
            {(field) => (
              <>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor={field.name}
                >
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
                  selectedValues={field.state.value.map((option: string) => ({
                    name: option,
                    id: 1,
                  }))}
                  onSelect={(selectedList) =>
                    field.handleChange(
                      selectedList.map(
                        (option: { name: string; id: number }) => option.name,
                      ),
                    )
                  }
                  onRemove={(selectedList) =>
                    field.handleChange(
                      selectedList.map(
                        (option: { name: string; id: number }) => option.name,
                      ),
                    )
                  }
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        <div className="mb-4">
          <form.Field
            name="terms"
            validators={{
              onChange: ({ value }) =>
                !value ? 'You must accept the terms and conditions' : undefined,
            }}
          >
            {(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  <input
                    id={field.name}
                    name={field.name}
                    type="checkbox"
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="ml-2">
                    I accept the terms and conditions
                  </span>
                </label>
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
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
