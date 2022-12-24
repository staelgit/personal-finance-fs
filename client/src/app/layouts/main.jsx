import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, signIn } from '../store/authSlice';
// import StyledNavLink from '../components/ui/StyledNavLink';
import Button from '../components/ui/Button';
import { useHistory } from 'react-router-dom';
import Card from '../components/common/Card';
import Accounts from '../components/ui/accounts';
import Categories from '../components/ui/categories';
import AnalyticsLayout from '../components/ui/AnalyticsLayout';

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
                  <div className="mx-auto pt-6 sm:pt-20 ">
                     <div>
                        <div>
                           <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                              Здравствуй дорогой друг
                           </h1>
                           <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                              Та находишься на сайте, который предоставляет
                              онлайн сервис для учета доходов и расходов. Для
                              того чтобы воспользоваться данным сервисом нужно
                              авторизоваться. Так же, для демонстрации
                              возможностей сервиса есть готовый пользователь. Ты
                              можешь войти под ним и посмотреть как все выглядит
                              уже в `рабочем` состоянии
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
