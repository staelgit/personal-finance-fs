import React, { useEffect, useState } from 'react';
// import operationService from '../services/operation.service';
import AccountsList from '../components/page/accountsList';
import {
   getOperations,
   updateOperation,
   removeOperation
} from '../store/operationSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { getCurrentUserId } from '../store/authSlice';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
import GroupList from '../components/common/groupList';
import { useHistory, useParams } from 'react-router-dom';
import NewOperation from '../components/ui/newOperation';

const PAGING_SIZE = 8;

const Operations = () => {
   const { add } = useParams();
   const history = useHistory();
   // const location = useLocation();
   const dispatch = useDispatch();
   const operations = useSelector(getOperations());
   // const currentUserId = useSelector(getCurrentUserId());
   const [currentPage, setCurrentPage] = useState(1);
   const operationsTypes = [
      { _id: 1, name: 'all' },
      { _id: 2, name: 'expense' },
      { _id: 3, name: 'income' }
   ];
   const [selectedType, setSelectedType] = useState({ _id: 1, name: 'all' });
   const [sortBy /*, setSortBy */] = useState({ path: 'date', order: 'asc' });
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
   /*
   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };

   const handleSort = (item) => {
      setSortBy(item);
   };

   const handleSearch = (searchQuery) => {
      setSearchBy(searchQuery);
   };
*/

   function filterOperations(data) {
      const filteredOperations =
         (selectedType.name !== 'all' &&
            data.filter((operation) =>
               _.isEqual(operation.type, selectedType.name)
            )) ||
         (searchBy &&
            data.filter(({ comment }) =>
               comment.toLowerCase().includes(searchBy.toLowerCase())
            )) ||
         data;
      return filteredOperations; /* .filter((user) => user._id !== currentUserId); */
   }

   const filteredOperations = filterOperations(operations);

   const count = filteredOperations.length;

   const sortedOperations = _.orderBy(
      filteredOperations,
      [sortBy.path],
      [sortBy.order]
   );

   // todo добавлено мной
   const correctPage = Math.ceil(count / PAGING_SIZE);
   if (currentPage > correctPage) {
      setCurrentPage(correctPage);
   }
   // todo добавлено мной

   const operationCrop = paginate(sortedOperations, currentPage, PAGING_SIZE);

   console.log('operationCrop:', operationCrop);

   /*
   const clearFilter = () => {
      setSelectedType({ _id: 1, name: 'all' });
   };
*/

   const handleUpdate = async () => {
      dispatch(
         updateOperation({
            _id: '63963552660a22c5ea92a20e',
            date: 1660743951490,
            type: 'income',
            categoryId: '6395b25554a00885e4bdf1a7',
            accountId: '6394e68132fe7c32c1d6e82f',
            comment: 'измененный коммент'
         })
      );
   };

   const handleDelete = async () => {
      dispatch(removeOperation('639c419891a01d35f83a0278'));
   };

   return (
      <>
         {add === 'add' ? (
            <NewOperation />
         ) : (
            <div>
               <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                  <div className="pt-4 pb-2 py-5 sm:px-6">
                     <div className="flex justify-between">
                        <div>
                           <h3 className="text-lg font-medium leading-6 text-gray-900">
                              Operations
                           </h3>
                           <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              Operations list
                           </p>
                        </div>
                        <div>
                           <div className="inline-block">
                              <button
                                 className="inline-flex items-center justify-center p-2 leading-6 shadow text-5xl font-medium rounded-full text-white bg-success hover:bg-success-dark focus:outline-none"
                                 type="button"
                                 onClick={() =>
                                    history.push('/app/operations/add', {
                                       state: { type: 'income' }
                                    })
                                 }
                                 title="Add income"
                              >
                                 <PlusIcon
                                    className="h-8 w-8 text-white "
                                    aria-hidden="true"
                                 />
                              </button>
                              <div className="text-xs text-center">income</div>
                           </div>
                           <div className="inline-block ml-4">
                              <button
                                 className="inline-flex items-center justify-center p-2 leading-6 shadow text-5xl font-medium rounded-full text-white bg-danger hover:bg-danger-dark focus:outline-none"
                                 type="button"
                                 onClick={() =>
                                    history.push('/app/operations/add', {
                                       state: { type: 'expense' }
                                    })
                                 }
                                 title="Add expense"
                              >
                                 <MinusIcon
                                    className="h-8 w-8 text-white"
                                    aria-hidden="true"
                                 />
                              </button>
                              <div className="text-xs text-center">expense</div>
                           </div>
                        </div>
                     </div>

                     <div className="flex">
                        <GroupList
                           selectedItem={selectedType}
                           items={operationsTypes}
                           onItemSelect={handleTypeSelect}
                        />

                        <div className="ml-5">
                           Фильтры еще: 2 Дата начала и конца 3.поиск по
                           комментарию
                        </div>
                     </div>
                  </div>
                  <div className="px-4 border-t border-gray-200 divide-y divide-secondary-light">
                     <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        Первая надпись
                     </div>
                     <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        Вторая надпись
                     </div>
                     <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        Следующая надпись
                     </div>
                  </div>
               </div>
               <div>3. Список/Табличка операций с пагинацией</div>
               <div className="grid gap-4 grid-cols-3">
                  <button
                     className="inline-flex items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-secondary-dark hover:bg-indigo-400 focus:outline-none my-2"
                     type="button"
                     onClick={handleUpdate}
                  >
                     Изменить
                  </button>
                  <button
                     className="inline-flex items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-danger-darkest hover:bg-indigo-400 focus:outline-none my-2"
                     type="button"
                     onClick={handleDelete}
                  >
                     Удалить
                  </button>
               </div>
               <AccountsList accounts={operationCrop} />
            </div>
         )}
      </>
   );
};

export default Operations;
