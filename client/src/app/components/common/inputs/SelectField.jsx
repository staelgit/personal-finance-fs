import React /*, { useState } */ from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import Select from 'react-select';
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const SelectField = (props) => {
   const [field, meta] = useField(props);
   // console.log('field:', field);
   // console.log('meta:', meta);
   // const [showPassword, setShowPassword] = useState(false);
   const displayError = meta.touched && meta.error;
   const errorStyle =
      'absolute text-danger-dark ring-blue-700 ring-opacity-5 appearance-none rounded block w-full   sm:text-sm -bottom-6 ';

   /*
   const getInputClasses = () => {
      return (
         'w-full rounded text-sm dark:bg-gray-700 h-12 focus:outline-none bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 pr-2 ' +
         (props.icon ? 'pl-12' : 'pl-3') +
         (displayError
            ? ' ring-1 ring-blue-700 focus:border-blue-700 focus:ring-blue-700 focus:'
            : '')
      );
   };
*/

   /*
   const toggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
   };
*/

   return (
      <div className="my-3 form-outline form-white relative ">
         {props.label && <label htmlFor={props.name}>{props.label}</label>}
         <div className="relative text-slate-500">
            {props.icon && (
               <props.icon className="h-6 w-6 absolute z-10 inset-y-3 left-4 xs:inline-block " />
            )}
            {/*            <select
               // placeholder={props.label}
               id={props.name}
               {...field}
               {...props}
               // type={showPassword ? 'text' : props.type}
               className={getInputClasses()}
            >
               <option className="h-6 w-6 bg-red" disabled>
                  Выберите героя
               </option>
               <option className="h-6 w-6 bg-red" value="Чебурашка">
                  Чебурашка
               </option>
               <option value="Крокодил Гена">Крокодил Гена</option>
               <option value="Шапокляк">Шапокляк</option>
               <option value="Крыса Лариса">Крыса Лариса</option>
            </select> */}
            <Select
               // placeholder={props.label}
               id={props.name}
               {...field}
               {...props}
               // type={showPassword ? 'text' : props.type}
               // className={getInputClasses()}
            />

            {/*            {props.type === 'password' && (
               <button
                  className="absolute inset-y-0.5 right-2.5 btn btn-outline-secondary text-slate-500"
                  type="button"
                  onClick={toggleShowPassword}
               >
                  {showPassword ? (
                     <EyeIcon className="relative w-6 h-6" />
                  ) : (
                     <EyeSlashIcon className="relative w-6 h-6" />
                  )}
               </button>
            )}
            */}
            {displayError ? (
               <div className={errorStyle + 'text-end'}>{meta.error}</div>
            ) : null}
         </div>
      </div>
   );
};
SelectField.propTypes = {
   icon: PropTypes.any,
   label: PropTypes.string,
   name: PropTypes.string,
   type: PropTypes.string
};

/* SelectField.defaultProps = {
   type: 'text'
}; */
export default SelectField;
