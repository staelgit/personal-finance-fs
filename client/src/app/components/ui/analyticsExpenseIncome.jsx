import React, { /* useEffect, */ useState } from 'react';
import PropTypes from 'prop-types';
import { getOperations } from '../../store/operationSlice';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { paginate } from '../../utils/paginate';
import Pagination from '../../components/common/pagination';
import { getCategories } from '../../store/categorySlice';
// import { getAccounts } from '../../store/accounSlice';
import AnalyticsExpenseIncomeTable from './analyticsExpenseIncomeTable';
import transformDate from '../../utils/transformDate';
// import Chart from './Chart';
import BarChart from './BarChart';
import RoundChart from './RoundChart';

const PAGING_SIZE = 10;

const AnalyticsExpenseIncome = ({ type }) => {
   const operations = useSelector(getOperations());
   const categories = useSelector(getCategories());
   const [currentPage, setCurrentPage] = useState(1);

   const [sortBy, setSortBy] = useState({ path: 'sum', order: 'desc' });
   const [isEmptySumVisible, toggleEmptySumVisible] = useState(true);
   const [isInteger, toggleInteger] = useState(true);
   const initialStartDate = generateDataString('startCurrentMonth');
   const [dateIntervalFrom, setDateIntervalFrom] = useState(initialStartDate);
   const [dateIntervalTo, setDateIntervalTo] = useState('');

   let total = 0;

   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };
   const handleSort = (item) => {
      setSortBy(item);
   };

   // const type = 'expense';
   // const type = 'income';

   function filterCategories() {
      // обрезать операции по выбранным категориям

      // обрезать операции по интервалу дат
      // console.log('operations:', operations);
      let filteredOperations = operations;

      if (dateIntervalFrom) {
         filteredOperations = filteredOperations.filter((o) => {
            const dateFromOperation = Number(o.date);
            const dateFromState = Number(
               transformDate(dateIntervalFrom, 'forDatabase')
            );
            return dateFromOperation >= dateFromState;
         });
      }
      if (dateIntervalTo) {
         filteredOperations = filteredOperations.filter((o) => {
            const dateFromOperation = Number(o.date);
            const dateFromState = Number(
               transformDate(dateIntervalTo, 'forDatabase')
            );
            return dateFromOperation <= dateFromState;
         });
      }

      console.log('filteredOperations:', filteredOperations);
      // посчитать суммы по категориям
      let filtered = categories
         .filter((c) => c.type === type)
         .map((c) => {
            const sum = filteredOperations.reduce((acc, item) => {
               return (acc += item.categoryId === c._id ? item.amount : 0);
            }, 0);
            return { _id: c._id, title: c.title, sum };
         });

      // обработать видимость нулевых сумм
      filtered = !isEmptySumVisible
         ? filtered.filter((c) => c.sum > 0)
         : filtered;

      // обработать округления до рублей
      filtered = isInteger
         ? filtered.map((c) => ({ ...c, sum: Math.round(c.sum) }))
         : filtered;

      // посчитать сумму для всех категорий
      total = filtered.reduce((acc, item) => {
         return (acc += item.sum);
      }, 0);
      // console.log('total:', total);

      // добавить проценты в передаваемое
      filtered = filtered.map((c) => {
         return {
            ...c,
            percent: c.sum !== 0 ? Math.round((c.sum / total) * 100) : 0
         };
      });

      return filtered;
   }

   const filteredCategories = filterCategories(operations);

   const sortedCategories = _.orderBy(
      filteredCategories,
      [sortBy.path],
      [sortBy.order]
   );

   const zeroClearedCategories = isEmptySumVisible
      ? sortedCategories.filter((c) => c.sum > 0)
      : sortedCategories;
   console.log('zeroCleared:', zeroClearedCategories);

   const count = filteredCategories.length;
   const zeroClearedCount = zeroClearedCategories.length;
   console.log('zeroClearedCount:', zeroClearedCount);

   const correctPage = Math.ceil(count / PAGING_SIZE);
   if (currentPage > correctPage) {
      setCurrentPage(correctPage);
   }

   const categoriesCrop = paginate(sortedCategories, currentPage, PAGING_SIZE);

   console.log('count:', count);
   const handleChangeDateFrom = ({ target }) => {
      const name = target.name;
      const value = target.value;
      if (name === 'from') {
         setDateIntervalFrom(value);
      } else if (name === 'to') {
         setDateIntervalTo(value);
      }
   };

   const chartData = generateChartData();
   console.log('chartData:', chartData);

   function generateChartData() {
      const newData = zeroClearedCategories.map((c) => {
         const randomHue = Math.round(Math.random() * 360);
         return {
            label: c.title,
            data: c.sum,
            backgroundColor: `hsla(${randomHue}, 83%, 48%, 0.2)`,
            borderColor: `hsla(${randomHue}, 83%, 48%, 1)`
         };
      });

      return {
         labels: newData.map((c) => c.label),
         datasets: [
            {
               data: newData.map((c) => c.data),
               backgroundColor: newData.map((c) => c.backgroundColor),
               borderColor: newData.map((c) => c.borderColor),
               borderWidth: 2
            }
         ]
      };
   }

   const clearDateInterval = () => {
      setDateIntervalFrom('');
      setDateIntervalTo('');
   };

   function generateDataString(type) {
      switch (type) {
         case 'startCurrentMonth': {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            return `${year}-${month}-01`;
         }
         default:
            return null;
      }
   }

   return (
      <>
         <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="flex p-2 items-center divide-x">
               <div className="p-2 w-64">
                  <div className="text-center">
                     <div>{`Общая сумма ${
                        type === 'expense'
                           ? 'расходов'
                           : type === 'income'
                           ? 'доходов'
                           : ''
                     }`}</div>
                     <div className=" text-2xl font-bold">{total}</div>
                     <div className="ml-1 text-xs text-secondary-light ">
                        руб
                     </div>
                  </div>
               </div>
               <div className="p-2 w-[28rem]">
                  <div className="flex flex-col items-center">
                     <div>
                        <input
                           type="date"
                           name="from"
                           id="from"
                           pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                           className="m-1 w-40 px-2 py-1 rounded text-sm dark:bg-gray-700  focus:outline-none bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400  "
                           onChange={handleChangeDateFrom}
                           value={dateIntervalFrom}
                        />

                        <span>&mdash;</span>
                        <input
                           type="date"
                           name="to"
                           id="to"
                           pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                           className="m-1 w-40 px-2 py-1 rounded text-sm dark:bg-gray-700  focus:outline-none bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400  "
                           onChange={handleChangeDateFrom}
                           value={dateIntervalTo}
                        />
                     </div>
                     <div>
                        <button
                           type="button"
                           onClick={clearDateInterval}
                           className="mt-1 px-3 pb-1 pt-0.5 rounded-xl hover:ring-1 text-secondary hover:ring-primary"
                        >
                           Очистить интервал
                        </button>
                     </div>
                  </div>
               </div>
               <div className="pl-12 py-2 pr-2 ">
                  <div className="">
                     <input
                        id="isEmptySumVisible"
                        type="checkbox"
                        checked={isEmptySumVisible}
                        onChange={() =>
                           toggleEmptySumVisible((prevState) => !prevState)
                        }
                     />
                     <label htmlFor="isEmptySumVisible" className="ml-2">
                        Показывать нулевые обороты
                     </label>
                  </div>
                  <div className="">
                     <input
                        id="isInteger"
                        type="checkbox"
                        checked={isInteger}
                        onChange={() =>
                           toggleInteger((prevState) => !prevState)
                        }
                     />
                     <label htmlFor="isInteger" className="ml-2">
                        Округлять до рублей
                     </label>
                  </div>
               </div>
            </div>
            <div className="flex px-6 py-3 border-t border-gray-200 divide-x min-h-52">
               {zeroClearedCount !== 0 ? (
                  <>
                     <div className="w-1/2 border-t border-gray-200 mr-2">
                        <AnalyticsExpenseIncomeTable
                           categories={categoriesCrop}
                           selectedSort={sortBy}
                           onSort={handleSort}
                        />

                        {count > PAGING_SIZE && (
                           <div className="flex justify-center pt-3 border-t border-gray-200">
                              <Pagination
                                 itemsCount={count}
                                 pageSize={PAGING_SIZE}
                                 currentPage={currentPage}
                                 onPageChange={handlePageChange}
                              />
                           </div>
                        )}
                     </div>
                     <div className="ml-5 pl-3 pt-3 flex justify-around">
                        <div>
                           <RoundChart data={chartData} />
                        </div>
                        <div className="ml-3">
                           <BarChart data={chartData} />
                        </div>
                     </div>
                  </>
               ) : (
                  <div className="my-10">Нет данных для отображения</div>
               )}
            </div>
         </div>
      </>
   );
};

AnalyticsExpenseIncome.propTypes = {
   type: PropTypes.string.isRequired
};

export default AnalyticsExpenseIncome;
