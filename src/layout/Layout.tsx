import { Fragment, PropsWithChildren } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link, Outlet } from 'react-router-dom'
import { isDevelopment } from '../core/utils/isProduction.tsx'
import ErrorBoundary from '../core/react/display/ErrorBoundary.tsx'
import { Copyright } from './footer/Copyright.tsx'
import { ReactComponent as Logo } from '../assets/logo.svg'

const user = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=250&h=250&q=80',
}

const navigation = [
  { name: 'Practice', href: '/practice', current: true },
  { name: 'Members', href: '/members', current: false },
  { name: 'Components', href: '/components', current: false, hidden: !isDevelopment() },
].filter((item) => !item.hidden)

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const brand = 'Brioso'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-full w-full flex-col">
      <Popover as="header" className="top-level-container bg-gray-800 pb-24">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative flex items-center justify-center py-5 lg:justify-between">
                {/* Logo */}
                <div className="absolute left-0 flex-shrink-0 lg:static">
                  <Link to={'/'} className="inline-flex gap-2 align-bottom text-white">
                    <Logo className="h-8 w-auto" />
                    <span className="hidden text-lg lg:block">{brand}</span>
                  </Link>
                </div>

                {/* Right section on desktop */}
                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                  <button
                    type="button"
                    className="flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>

                {/* Search */}
                <div className="min-w-0 flex-1 px-12 lg:hidden">
                  <div className="mx-auto w-full max-w-xs">
                    <label htmlFor="desktop-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative text-white focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="desktop-search"
                        className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </div>
                </div>

                {/* Menu button */}
                <div className="absolute right-0 flex-shrink-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                <div className="grid grid-cols-3 items-center gap-8">
                  <div className="col-span-2">
                    <nav className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white hover:bg-gray-950'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div>
                    <div className="mx-auto w-full max-w-md">
                      <label htmlFor="mobile-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="mobile-search"
                          className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Transition.Root as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                  >
                    <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="pb-2 pt-3">
                        <div className="flex items-center justify-between px-4">
                          <Link
                            to={'/'}
                            className="-m-1 inline-flex gap-2 p-1 align-bottom text-black"
                          >
                            <Logo className="h-8 w-auto" />
                            <span className="text-lg">{brand}</span>
                          </Link>

                          <div className="-mr-2">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                              <span className="sr-only">Close menu</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <nav className="mt-3 space-y-1 px-2">
                          {navigation.map((item) => (
                            <Popover.Button
                              as={Link}
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current ? '' : '',
                                'block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800',
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Popover.Button>
                          ))}
                        </nav>
                        <div className="mt-3 space-y-1 px-2"></div>
                      </div>
                      <div className="pb-2 pt-4">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <div className="truncate text-base font-medium text-gray-800">
                              {user.name}
                            </div>
                            <div className="truncate text-sm font-medium text-gray-500">
                              {user.email}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                          {userNavigation.map((item) => (
                            <Popover.Button
                              as={Link}
                              key={item.name}
                              to={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </Popover.Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
          </>
        )}
      </Popover>

      <main className="top-level-container -mt-24 flex-1 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <ErrorBoundary>{children || <Outlet />}</ErrorBoundary>
        </div>
      </main>

      <footer className="top-level-container bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            {navigation.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
          <Copyright />
        </div>
      </footer>
    </div>
  )
}
