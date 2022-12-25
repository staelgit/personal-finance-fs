import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../../store/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import EntityListCard from './entityListCard';
import EditButton from './editButton';
import DeleteButton from './deleteButton';
import Table from '../common/table';
import _ from 'lodash';
import { setModalOn } from '../../store/modalSlice';

const Categories = ({ type }) => {
   const dispatch = useDispatch();
   const categories = useSelector(getCategories());

   const [sortBy, setSortBy] = useState({ path: 'title', order: 'asc' });

   let title;
   let titleNewCategory;
   let titleUpdateCategory;
   const filteredByType = categories.filter((c) => c.type === type);

   if (type === 'income') {
      title = 'Доходы';
      titleNewCategory = 'Новая категория дохода';
      titleUpdateCategory = 'Изменить доход';
   } else if (type === 'expense') {
      title = 'Расходы';
      titleNewCategory = 'Новая категория расхода';
      titleUpdateCategory = 'Изменить расход';
   }

   const columns = {
      title: {
         path: 'title',
         name: 'Наименование',
         component: (category) => <div className="py-1">{category.title}</div>
      },
      editButton: {
         component: (category) => (
            <div className="py-1 px-1  leading-4 text-center flex justify-end opacity-0 group-hover:opacity-100">
               <EditButton onClick={() => handleUpdateCategory(category._id)} />
            </div>
         )
      },
      deleteButton: {
         component: (category) => (
            <div className="py-1 px-1 leading-4 flex justify-center opacity-0 group-hover:opacity-100">
               <DeleteButton onClick={() => handleDelete(category._id)} />
            </div>
         )
      }
   };

   const handleSort = (item) => {
      setSortBy(item);
   };

   const sortedCategories = _.orderBy(
      filteredByType,
      [sortBy.path],
      [sortBy.order]
   );

   function handleDelete(id) {
      dispatch(
         setModalOn({
            type: 'delete',
            data: {
               type: 'category',
               id
            }
         })
      );
   }

   function handleUpdateCategory(id) {
      dispatch(
         setModalOn({
            type: 'category',
            data: {
               type: 'update',
               title: titleUpdateCategory,
               componentId: id
            }
         })
      );
   }

   function handleNewCategory() {
      dispatch(
         setModalOn({
            type: 'category',
            data: {
               type: 'new',
               subtype: type,
               title: titleNewCategory,
               componentId: ''
            }
         })
      );
   }

   return (
      <EntityListCard title={title} onAdd={handleNewCategory}>
         <div>
            <Table
               selectedSort={sortBy}
               onSort={handleSort}
               {...{
                  columns,
                  data: sortedCategories
               }}
            />
         </div>
      </EntityListCard>
   );
};

Categories.propTypes = {
   type: PropTypes.string.isRequired
};

export default Categories;
