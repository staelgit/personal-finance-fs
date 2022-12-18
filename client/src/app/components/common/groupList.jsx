import React from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';

const GroupList = ({
   items,
   valueProperty,
   contentProperty,
   onItemSelect,
   selectedItem
}) => {
   return (
      <div className="rounded-2xl border py-1 px-0.5  bg-secondary-ultralight">
         {Object.keys(items).map((key) => {
            return (
               <button
                  key={items[key][valueProperty]}
                  className={`operations-filter rounded-2xl bg-white border mx-0.5 px-2 ${
                     items[key].name === selectedItem.name ? 'active' : ''
                  }`}
                  onClick={() => onItemSelect(items[key])}
                  role="button"
               >
                  {items[key][contentProperty]}
               </button>
            );
         })}
      </div>
   );
};

GroupList.defaultProps = {
   valueProperty: '_id',
   contentProperty: 'name'
};

GroupList.propTypes = {
   items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
   valueProperty: PropTypes.string.isRequired,
   contentProperty: PropTypes.string.isRequired,
   onItemSelect: PropTypes.func,
   selectedItem: PropTypes.object
};

export default GroupList;
