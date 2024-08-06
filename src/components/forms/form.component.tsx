import Multiselect from 'multiselect-react-dropdown';

export default function Form(): React.ReactElement {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30%]">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="option1"
            >
              Option 1
              <input
                className="leading-tight"
                id="option1"
                type="radio"
                name="option"
                value="Option1"
              />
            </label>
          </div>
          <div className="w-full flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="option2"
            >
              Option 2
              <input
                className="leading-tight"
                id="option2"
                type="radio"
                name="option"
                value="Option2"
              />
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="agree"
            >
              <input
                className="leading-tight"
                id="agree"
                type="checkbox"
                name="agree"
              />
              Agree to terms
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
            htmlFor="multiSelect"
          >
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
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
