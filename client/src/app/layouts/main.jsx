import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, signIn } from '../store/authSlice';
// import StyledNavLink from '../components/ui/StyledNavLink';
import Button from '../components/ui/Button';
import { useHistory } from 'react-router-dom';
import Card from '../components/common/Card';
import Accounts from '../components/ui/accounts';
import Categories from '../components/ui/categories';

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

               <Card className="mt-3">
                  <Card.Title>2.аналитика</Card.Title>
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
                        {/* <div className="hidden sm:mt-8 sm:flex sm:justify-center">
                           <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                              <span className="text-secondary">
                                 Тут можно написать какой то текст и куда то
                                 отослать или удали потом.{' '}
                                 <a
                                    href="#"
                                    className="font-semibold text-indigo-600"
                                 >
                                    <span
                                       className="absolute inset-0"
                                       aria-hidden="true"
                                    />
                                    Читать далее{' '}
                                    <span aria-hidden="true">&rarr;</span>
                                 </a>
                              </span>
                           </div>
                        </div> */}
                     </div>
                  </div>
               </div>
            </main>
         )}
      </div>
   );
};

export default Main;
