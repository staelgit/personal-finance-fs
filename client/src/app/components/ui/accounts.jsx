import React, { useState } from 'react';
import { getAccounts } from '../../store/accounSlice';
import { useDispatch, useSelector } from 'react-redux';
import EntityListCard from './entityListCard';
import EditButton from './editButton';
import DeleteButton from './deleteButton';
import Table from '../common/table';
import _ from 'lodash';
import { setModalOn } from '../../store/modalSlice';

const Accounts = () => {
   const dispatch = useDispatch();
   const accounts = useSelector(getAccounts());

   // console.log('accounts from redux:', accounts);

   const [sortBy, setSortBy] = useState({ path: 'title', order: 'asc' });

   const columns = {
      title: {
         path: 'title',
         name: 'Наименование',
         component: (account) => <div className="py-1">{account.title}</div>
      },
      editButton: {
         component: (account) => (
            <div
               className={
                  'py-1 px-1  leading-4 text-center flex justify-end opacity-0 group-hover:opacity-100'
               }
            >
               <EditButton onClick={() => handleUpdateAccount(account._id)} />
            </div>
         )
      },
      deleteButton: {
         component: (account) => (
            <div
               className={
                  'py-1 px-1 leading-4 flex justify-center opacity-0 group-hover:opacity-100'
               }
            >
               <DeleteButton onClick={() => handleDelete(account._id)} />
            </div>
         )
      }
   };

   const handleSort = (item) => {
      setSortBy(item);
   };

   const sortedAccounts = _.orderBy(accounts, [sortBy.path], [sortBy.order]);

   function handleDelete(id) {
      dispatch(
         setModalOn({
            type: 'delete',
            data: {
               type: 'account',
               id
            }
         })
      );
   }

   function handleUpdateAccount(id) {
      dispatch(
         setModalOn({
            type: 'account',
            data: {
               type: 'update',
               title: 'Изменить счет',
               componentId: id
            }
         })
      );
   }

   function handleNewAccount() {
      console.log('handleNewAccount');
      dispatch(
         setModalOn({
            type: 'account',
            data: {
               type: 'new',
               title: 'Новый счет',
               componentId: ''
            }
         })
      );
   }

   return (
      <EntityListCard title="Счета" onAdd={handleNewAccount}>
         <Table
            selectedSort={sortBy}
            onSort={handleSort}
            {...{
               columns,
               data: sortedAccounts
            }}
         />
      </EntityListCard>
   );
};

export default Accounts;
