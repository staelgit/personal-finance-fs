import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

export const MultiSelectField = ({ options, field, form, label }) => {
   // console.log('options:', options);
   // console.log('field:', field);
   // console.log('form:', form);

   const displayError =
      /* form.touched['react-select-3-input'] ||
         form.touched['react-select-2-input'] || */
      form.touched[field.name] && form.errors[field.name];
   // console.log('displayError:', displayError);

   const getInputClasses = () => {
      return (
         'w-full rounded text-sm dark:bg-gray-700 focus:outline-none bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 ' +
         (displayError
            ? ' ring-1 ring-blue-700 focus:border-blue-700 focus:ring-blue-700 focus:'
            : '')
      );
   };

   return (
      <div className="my-3 form-outline form-white relative ">
         {label && <label htmlFor={field.name}>{label}</label>}
         <div className="relative text-slate-500 ">
            <div className={getInputClasses()}>
               <Select
                  id={field.name}
                  options={options}
                  name={field.name}
                  value={
                     options
                        ? options.find((option) => option.value === field.value)
                        : ''
                  }
                  onChange={(option) =>
                     form.setFieldValue(field.name, option.value)
                  }
                  onBlur={field.onBlur}
                  styles={{
                     control: (baseStyles, state) => {
                        // console.log('baseStyles:', baseStyles);
                        return {
                           ...baseStyles,
                           borderColor: 'rgba(255, 255, 255, 0)'
                        };
                     } /*,
                     option: (baseStyles, state) => {
                        console.log('baseStyles:', baseStyles);
                        return { ...baseStyles, color: 'red' };
                     } */
                  }}
               />
            </div>
            {displayError ? (
               <div
                  className={
                     'absolute text-danger-dark ring-blue-700 ring-opacity-5 appearance-none rounded block w-full   sm:text-sm -bottom-6 text-end'
                  }
               >
                  {displayError}
               </div>
            ) : null}
         </div>
      </div>
   );
};

MultiSelectField.propTypes = {
   options: PropTypes.array,
   field: PropTypes.object,
   form: PropTypes.object,
   label: PropTypes.string
};
