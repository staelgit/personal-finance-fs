import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, signIn } from '../store/authSlice';
import { useHistory } from 'react-router-dom';
import Accounts from '../components/ui/accounts';
import Categories from '../components/ui/categories';
import AnalyticsLayout from '../components/ui/AnalyticsLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Main = () => {
   const isLoggedIn = useSelector(getIsLoggedIn());
   const dispatch = useDispatch();
   const history = useHistory();

   const handleLogin = async () => {
      const demoUser = { email: 'demo@gmail.com', password: '3gs6A9bVFB' };
      const redirect = '/';
      dispatch(signIn({ payload: demoUser, redirect }));
   };

   return (
      <div>
         {isLoggedIn ? (
            <>
               <div className="grid grid-cols-3 gap-3 ">
                  <div>
                     <Accounts />
                  </div>
                  <div>
                     <Categories type="income" />
                  </div>
                  <div>
                     <Categories type="expense" />
                  </div>
               </div>

               <Card className="mt-3 px-4 py-4">
                  <Card.Title>Аналитика</Card.Title>
                  <AnalyticsLayout />
               </Card>
            </>
         ) : (
            <main>
               <div className="relative px-6 lg:px-8">
                  <div className="mx-auto w-2/3 pt-16 sm:pt-40 ">
                     <div>
                        <div>
                           <h1 className="text-2xl font-bold tracking-tight text-center sm:text-6xl">
                              Здравствуй дорогой друг
                           </h1>
                           <p className="mt-12 text-lg leading-9 text-gray-600 sm:text-center">
                              Та находишься на сайте, который предоставляет
                              онлайн сервис для учета доходов и расходов. Для
                              того чтобы воспользоваться данным сервисом нужно
                              авторизоваться. Для демонстрации возможностей
                              сервиса есть готовый пользователь. Ты можешь войти
                              под ним и посмотреть как все выглядит уже в
                              `рабочем` состоянии.
                           </p>
                           <div className="mt-8 flex gap-x-4 sm:justify-center">
                              <Button onClick={() => history.push('/login')}>
                                 Начать
                                 <span aria-hidden="true">&rarr;</span>
                              </Button>
                              <Button
                                 buttonType="secondary"
                                 onClick={handleLogin}
                              >
                                 Демо
                                 <span aria-hidden="true">&rarr;</span>
                              </Button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         )}
      </div>
   );
};

export default Main;
