import React from 'react';
import PropTypes from 'prop-types';

const DateIntervalPicker = ({
   handleChangeDate,
   dateIntervalFrom,
   dateIntervalTo
}) => {
   return (
      <div>
         <input
            type="date"
            name="from"
            id="from"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            className="m-1 w-40 px-2 py-1 rounded text-sm dark:bg-gray-700  focus:outline-none bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400  "
            onChange={handleChangeDate}
            value={dateIntervalFrom}
         />
         <span>&mdash;</span>
         <input
            type="date"
            name="to"
            id="to"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            className="m-1 w-40 px-2 py-1 rounded text-sm dark:bg-gray-700  focus:outline-none bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400  "
            onChange={handleChangeDate}
            value={dateIntervalTo}
         />
      </div>
   );
};

DateIntervalPicker.propTypes = {
   handleChangeDate: PropTypes.func,
   dateIntervalFrom: PropTypes.string,
   dateIntervalTo: PropTypes.string
};

export default DateIntervalPicker;
