import React, { useEffect, useState } from 'react';
// import operationService from '../services/operation.service';
import { getOperations } from '../store/operationSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { getCurrentUserId } from '../store/authSlice';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
import GroupList from '../components/common/groupList';
import { setModalOn } from '../store/modalSlice';
import OperationsTable from '../components/ui/operationsTable';
import Pagination from '../components/common/pagination';
import { getCategories } from '../store/categorySlice';
import { getAccounts } from '../store/accounSlice';

const PAGING_SIZE = 6;

const Operations = () => {
   const dispatch = useDispatch();
   const operations = useSelector(getOperations());
   const categories = useSelector(getCategories());
   const accounts = useSelector(getAccounts());
   // const currentUserId = useSelector(getCurrentUserId());
   const [currentPage, setCurrentPage] = useState(1);
   const operationsTypes = [
      { _id: 1, name: 'все', key: 'all' },
      { _id: 2, name: 'расходы', key: 'expense' },
      { _id: 3, name: 'доходы', key: 'income' }
   ];
   const [selectedType, setSelectedType] = useState(operationsTypes[0]);
   const [sortBy, setSortBy] = useState({ path: 'date', order: 'desc' });
   const [searchBy, setSearchBy] = useState('');
   console.log('operations from redux:', operations);

   useEffect(() => {
      setCurrentPage(1);
      if (searchBy && selectedType) {
         setSearchBy('');
      }
   }, [selectedType]);

   /*   useEffect(() => {
      if (searchBy && selectedType) {
         setSelectedType('all');
      }
   }, [searchBy]); */

   const handleTypeSelect = (item) => {
      setSelectedType(item);
   };
   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };
   const handleSort = (item) => {
      setSortBy(item);
   };

   /*
   const handleSearch = (searchQuery) => {
      setSearchBy(searchQuery);
   };
*/

   function filterOperations(data) {
      const filteredOperations =
         (selectedType.key !== 'all' &&
            data.filter((operation) =>
               _.isEqual(operation.type, selectedType.key)
            )) ||
         (searchBy &&
            data.filter(({ comment }) =>
               comment.toLowerCase().includes(searchBy.toLowerCase())
            )) ||
         data;
      return filteredOperations;
   }

   const filteredOperations = filterOperations(operations);

   const count = filteredOperations.length;

   const transformedFilteredOperations =
      transformOperationsForSort(filteredOperations);
   console.log('transformedFilteredOperations:', transformedFilteredOperations);

   const sortedOperations = _.orderBy(
      transformedFilteredOperations,
      [sortBy.path],
      [sortBy.order]
   );

   function transformOperationsForSort(filteredOperations) {
      return filteredOperations.map((o) => {
         return {
            ...o,
            category: categories.find((c) => c._id === o.categoryId).title,
            account: accounts.find((a) => a._id === o.accountId).title,
            incomeAmount: o.type === 'income' ? o.amount : 0,
            expenseAmount: o.type === 'expense' ? o.amount : 0,
            dateString: new Date(Number(o.date)).toLocaleDateString('ru-RU', {
               year: 'numeric',
               month: 'numeric',
               day: 'numeric'
            })
         };
      });
   }

   const correctPage = Math.ceil(count / PAGING_SIZE);
   if (currentPage > correctPage) {
      setCurrentPage(correctPage);
   }

   const operationsCrop = paginate(sortedOperations, currentPage, PAGING_SIZE);

   console.log('operationsCrop:', operationsCrop);

   /*
   const clearFilter = () => {
      setSelectedType({ _id: 1, name: 'all' });
   };
*/

   return (
      <>
         <div>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
               <div className="pt-4 pb-4 py-5 sm:px-6 ">
                  <div className="flex justify-between ">
                     <div className="flex flex-col justify-between">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                           Операции
                        </h3>
                        <div className="flex">
                           <GroupList
                              selectedItem={selectedType}
                              items={operationsTypes}
                              onItemSelect={handleTypeSelect}
                           />
                        </div>
                     </div>
                     <div className="rounded border border-secondary-ultralight py-1 px-2">
                        <div className="text-center border-b text-xs mb-2">
                           Добавить
                        </div>
                        <div className="inline-block">
                           <button
                              className="inline-flex items-center justify-center p-2 leading-6 shadow text-5xl font-medium rounded-full text-white bg-success hover:bg-success-dark focus:outline-none"
                              type="button"
                              onClick={() => {
                                 dispatch(
                                    setModalOn({
                                       type: 'operation',
                                       data: {
                                          type: 'income',
                                          title: 'Новый доход',
                                          componentId: ''
                                       }
                                    })
                                 );
                              }}
                              title="Add income"
                           >
                              <PlusIcon
                                 className="h-8 w-8 text-white "
                                 aria-hidden="true"
                              />
                           </button>
                           <div className="text-xs text-center">доход</div>
                        </div>
                        <div className="inline-block ml-4">
                           <button
                              className="inline-flex items-center justify-center p-2 leading-6 shadow text-5xl font-medium rounded-full text-white bg-danger hover:bg-danger-dark focus:outline-none"
                              type="button"
                              onClick={() => {
                                 dispatch(
                                    setModalOn({
                                       type: 'operation',
                                       data: {
                                          type: 'expense',
                                          title: 'Новый расход',
                                          componentId: ''
                                       }
                                    })
                                 );
                              }}
                              title="Add expense"
                           >
                              <MinusIcon
                                 className="h-8 w-8 text-white"
                                 aria-hidden="true"
                              />
                           </button>
                           <div className="text-xs text-center">расход</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="px-6 border-t border-gray-200 divide-y divide-secondary-light">
                  {count !== 0 ? (
                     <OperationsTable
                        operations={operationsCrop}
                        selectedSort={sortBy}
                        onSort={handleSort}
                        // onDelete={handleDelete}
                        // onToggleBookmark={handleToggleBookmark}
                     />
                  ) : (
                     <div className="my-10">У вас еще нет ни одно операции</div>
                  )}
               </div>
               {count !== 0 && (
                  <div className="flex justify-center mb-3 pt-3 border-t border-gray-200">
                     <Pagination
                        itemsCount={count}
                        pageSize={PAGING_SIZE}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                     />
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default Operations;
