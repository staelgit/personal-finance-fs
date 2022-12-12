import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
   ArrowRightOnRectangleIcon,
   UserIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '../../store/authSlice';

const NavProfile = () => {
   // const { currentUser } = useAuth();
   const currentUser = useSelector(getCurrentUserData());
   // console.log('currentUser navProfile', currentUser);
   return (
      <Menu as="div" className="relative inline-block text-left">
         <div>
            <Menu.Button className="inline-flex  w-full justify-center items-center rounded-md px-2 pt-1 pb-1 text-sm font-medium hover:bg-secondary-ultralight hover:text-black ">
               <img
                  src={currentUser.image}
                  className="rounded-full"
                  alt="avatar"
                  width="28"
                  height="28"
               />
               <div className="ml-2">{currentUser.name}</div>
               <ChevronDownIcon
                  className="ml-4 mt-1 h-4 w-5 hover:bg-secondary-ultralight hover:text-black"
                  aria-hidden="true"
               />
            </Menu.Button>
         </div>
         <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
               <div className="px-1 py-1">
                  <Menu.Item>
                     {({ active }) => (
                        <Link to={`/app/user/${currentUser._id}`}>
                           <button
                              className={`${
                                 active
                                    ? 'bg-secondary-ultralight text-black'
                                    : 'text-secondary-dark'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                           >
                              <UserIcon
                                 className="mr-2 h-5 w-5"
                                 aria-hidden="true"
                              />
                              Profile
                           </button>
                        </Link>
                     )}
                  </Menu.Item>
               </div>
               <div className="px-1 py-1">
                  <Menu.Item>
                     {({ active }) => (
                        <Link to="/logout">
                           <button
                              className={`${
                                 active
                                    ? 'bg-secondary-ultralight text-black'
                                    : 'text-secondary-dark'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                           >
                              <ArrowRightOnRectangleIcon
                                 className="mr-2 h-5 w-5"
                                 aria-hidden="true"
                              />
                              Logout
                           </button>
                        </Link>
                     )}
                  </Menu.Item>
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
};
export default NavProfile;
