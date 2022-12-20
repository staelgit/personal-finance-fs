import React from 'react';
import PropTypes from 'prop-types';

const DateTableCell = ({ date }) => {
   const newDate = new Date(+date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
   });
   return <>{newDate}</>;
};

DateTableCell.propTypes = {
   date: PropTypes.string.isRequired
};

export default DateTableCell;
