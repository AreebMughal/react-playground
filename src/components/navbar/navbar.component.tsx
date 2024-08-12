import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', current: true },
  {
    name: 'Forms',
    href: '#',
    current: false,
    submenu: [
      { name: 'Controlled', href: "/controlled-form" },
      { name: 'Uncontrolled', href: "/uncontrolled-form" },
      { name: 'Formik (Controlled)', href: "/formik-controlled-form" },
      { name: 'Formik (Unontrolled)', href: "/formik-uncontrolled-form" },
      { name: 'React Hook Form (Controlled)', href: "/react-hook-form-controlled" },
      { name: 'React Hook Form (Uncontrolled)', href: "/react-hook-form-uncontrolled" },
      { name: 'TanStack Form (Controlled)', href: "/tanstack-controlled-form" },
      { name: 'TanStack Form (Uncontrolled)', href: "/tanstack-controlled-form" },
    ],
  },
  {
    name: 'State Management',
    href: '#',
    current: false,
    submenu: [
      { name: 'useReducer', href: "/state-management/use-reducer" },
      { name: 'Reducer Mangement', href: "/state-management/redux/redux-management" },
      { name: 'Context API', href: "/state-management/context-api" },
    ],
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="logo"
                src="/logo.png"
                className="App-logo !h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                    {item.submenu && (
                      <div className="absolute left-0 mt-1 hidden w-48 origin-top-left rounded-md bg-white shadow-lg group-hover:block">
                        <div className="py-1">
                          {item.submenu.map((subitem) => (
                            <a
                              key={subitem.name}
                              href={subitem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {subitem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
