import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className: customClasses }) => {
   return (
      <div
         className={`rounded-lg overflow-hidden ring-1 ring-secondary-dark/5 shadow-md p-8 ${customClasses}`}
      >
         {children}
      </div>
   );
};
const CardTitle = ({ children, label }) => {
   return <h1 className="text-2xl mb-3 ">{children || label}</h1>;
};

Card.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ]),
   className: PropTypes.string
};

CardTitle.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ]),
   label: PropTypes.string
};

Card.Title = CardTitle;
export default Card;
