const transformDate = (date, key) => {
   switch (key) {
      case 'forDatabase':
         return new Date(date).getTime().toString();

      case 'forInput': {
         const newDate = new Date(+date);
         return `${newDate.getFullYear()}-${String(
            newDate.getMonth() + 1
         ).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
      }

      default:
         return date;
   }
};

export default transformDate;
