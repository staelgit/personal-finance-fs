/*
import React from 'react';



import Card from '../components/common/Card';

const Income = () => {
   return (
      <Card className="mt-6 w-1/2 m-auto ">
         <h1>Income</h1>
      </Card>
   );
};

export default Income;
*/
/* This example requires Tailwind CSS v3.0+ */
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
   ArrowLeftOnRectangleIcon,
   Bars3Icon,
   XMarkIcon
} from '@heroicons/react/24/outline';
import Logo from '../components/ui/logo';
import NavProfile from '../components/ui/navProfile';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../store/authSlice';

const navigation = [
   { name: 'Главная', href: '#' },
   { name: 'Операции', href: '#' },
   { name: 'Категории', href: '#' },
   { name: 'Счета', href: '#' }
];

export default function Income() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const isLoggedIn = useSelector(getIsLoggedIn());

   return (
      <div className="isolate bg-white">
         <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"></div>
         <div className="px-6 pt-6 lg:px-8">
            <div>
               <nav
                  className="flex h-9 items-center justify-between"
                  aria-label="Global"
               >
                  <div
                     className="flex lg:min-w-0 lg:flex-1"
                     aria-label="Global"
                  >
                     <Logo />
                  </div>
                  <div className="flex lg:hidden">
                     <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                     >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                     </button>
                  </div>
                  <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                     {navigation.map((item) => (
                        <NavLink
                           exact={item.href === '/' && true}
                           key={item.name}
                           className="flex items-center main-menu-item"
                           to={item.href}
                        >
                           <div className="px-2 py-1 leading-7 rounded-md hover:bg-secondary-ultralight">
                              {item.name}
                           </div>
                        </NavLink>
                     ))}
                  </div>
                  <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                     {isLoggedIn ? (
                        <NavProfile />
                     ) : (
                        <Link
                           className="flex items-center rounded-md px-2 py-2 text-sm hover:bg-secondary-ultralight hover:text-black"
                           to="/login"
                        >
                           <ArrowLeftOnRectangleIcon
                              className="rotate-180 mr-1 h-5 w-5"
                              aria-hidden="true"
                           />
                           Login
                        </Link>
                     )}
                  </div>
               </nav>
               <Dialog
                  as="div"
                  open={mobileMenuOpen}
                  onClose={setMobileMenuOpen}
               >
                  <Dialog.Panel
                     focus="true"
                     className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
                  >
                     <div className="flex h-9 items-center justify-between">
                        <div className="flex">
                           <Logo />
                        </div>
                        <div className="flex">
                           <button
                              type="button"
                              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                              onClick={() => setMobileMenuOpen(false)}
                           >
                              <span className="sr-only">Close menu</span>
                              <XMarkIcon
                                 className="h-6 w-6"
                                 aria-hidden="true"
                              />
                           </button>
                        </div>
                     </div>
                     <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                           <div className="space-y-2 py-6">
                              {navigation.map((item) => (
                                 <NavLink
                                    exact={item.href === '/' && true}
                                    key={item.name}
                                    className="flex items-center main-menu-item"
                                    to={item.href}
                                 >
                                    <div className="px-2 py-1 leading-7 rounded-md hover:bg-secondary-ultralight">
                                       {item.name}
                                    </div>
                                 </NavLink>
                              ))}
                           </div>
                           <div className="py-6">
                              {isLoggedIn ? (
                                 <NavProfile />
                              ) : (
                                 <Link
                                    className="flex items-center rounded-md px-2 py-2 text-sm hover:bg-secondary-ultralight hover:text-black"
                                    to="/login"
                                 >
                                    <ArrowLeftOnRectangleIcon
                                       className="rotate-180 mr-1 h-5 w-5"
                                       aria-hidden="true"
                                    />
                                    Login
                                 </Link>
                              )}
                           </div>
                        </div>
                     </div>
                  </Dialog.Panel>
               </Dialog>
            </div>
         </div>
         <main>
            <div className="relative px-6 lg:px-8">
               <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                  <div>
                     <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                           <span className="text-gray-600">
                              Тут можно написать какой то текст и куда то
                              отослать или удали потом.{' '}
                              <a
                                 href="#"
                                 className="font-semibold text-indigo-600"
                              >
                                 <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                 />
                                 Читать далее{' '}
                                 <span aria-hidden="true">&rarr;</span>
                              </a>
                           </span>
                        </div>
                     </div>
                     <div>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                           Data to enrich your online business
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                           Anim aute id magna aliqua ad ad non deserunt sunt.
                           Qui irure qui lorem cupidatat commodo. Elit sunt amet
                           fugiat veniam occaecat fugiat aliqua.
                        </p>
                        <div className="mt-8 flex gap-x-4 sm:justify-center">
                           <a
                              href="#"
                              className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                           >
                              Get started
                              <span
                                 className="text-indigo-200"
                                 aria-hidden="true"
                              >
                                 &rarr;
                              </span>
                           </a>
                           <a
                              href="#"
                              className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                           >
                              Live demo
                              <span
                                 className="text-gray-400"
                                 aria-hidden="true"
                              >
                                 &rarr;
                              </span>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
}
