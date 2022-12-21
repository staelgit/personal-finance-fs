import React from 'react';
import PropTypes from 'prop-types';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import RoundButton from './roundButton';

const EntityListCard = ({
   children,
   className: customClasses,
   title,
   onAdd
}) => {
   return (
      <div
         className={`rounded-lg overflow-hidden ring-1 ring-secondary-dark/5 shadow-md ${customClasses}`}
      >
         <Disclosure>
            {({ open }) => (
               <>
                  <Disclosure.Button
                     as="div"
                     className="flex justify-between p-4 cursor-pointer"
                  >
                     <h3 className="font-semibold">{title}</h3>

                     <div>
                        <ChevronUpIcon
                           className={`${
                              open ? 'rotate-180 transform' : ''
                           } h-5 w-5 `}
                        />
                     </div>
                  </Disclosure.Button>
                  <Disclosure.Panel as="div">
                     <div className=" max-h-96 overflow-y-auto px-4 py-2 border-y border-secondary-light ">
                        {children}
                     </div>
                     <div className="px-4 py-3 flex justify-center">
                        <div className="group ">
                           <div
                              role="button"
                              onClick={onAdd}
                              className="inline-flex items-center rounded-full group-hover:ring-1 ring-primary pl-1 pr-2 py-1"
                           >
                              <RoundButton
                                 size="small"
                                 type="button"
                                 className="group-hover:bg-primary bg-primary-light"
                              />
                              <span className="ml-1 leading-3">Добавить</span>
                           </div>
                        </div>
                     </div>
                  </Disclosure.Panel>
               </>
            )}
         </Disclosure>
      </div>
   );
};

EntityListCard.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ]),
   className: PropTypes.string,
   title: PropTypes.string,
   onAdd: PropTypes.func
};

export default EntityListCard;
