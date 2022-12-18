import React from 'react';
// import useMockData from '../utils/mockData';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, signIn } from '../store/authSlice';
import StyledNavLink from '../components/ui/StyledNavLink';

const Main = () => {
   const isLoggedIn = useSelector(getIsLoggedIn());
   const dispatch = useDispatch();

   const handleLogin = async () => {
      const demoUser = { email: 'demo@gmail.com', password: '3gs6A9bVFB' };
      const redirect = '/';
      dispatch(signIn({ payload: demoUser, redirect }));
   };

   return (
      <div>
         {isLoggedIn ? (
            <>
               <h3>1. Состояние счетов сумма</h3>
            </>
         ) : (
            <>
               <h1>Приветственное слово</h1>
               <p>
                  Здравствуй дорогой друг. Та находишься на сайте, который
                  предоставляет онлайн сервис для учета доходов и расходов.
               </p>
               <p>
                  Для того чтобы воспользоваться данным сервисом нужно{' '}
                  <StyledNavLink
                     to="login"
                     styleType="underline"
                     className="text-sm text-slate-600"
                  >
                     авторизоваться
                  </StyledNavLink>
                  .{' '}
               </p>
               <p>
                  Так же, для демонстрации возможностей сервиса есть готовый
                  пользователь. Ты можешь{' '}
                  <StyledNavLink
                     to=""
                     styleType="underline"
                     className="text-sm text-slate-600"
                     onClick={handleLogin}
                  >
                     войти под ним
                  </StyledNavLink>{' '}
                  и посмотреть как все выглядит уже в `рабочем` состоянии.{' '}
               </p>
            </>
         )}
      </div>
   );

   /*   const { error, initialize, progress, status } = useMockData();
   const handleClick = () => {
      initialize();
   };
   return (
      <div>
         <h1>Main Page</h1>
         {isLoggedIn ? (
            <>
               <h3>Инициализация данных в FireBase</h3>
               <ul>
                  <li>Status: {status}</li>
                  <li>Progress: {progress}%</li>
                  {error && <li>Error: {error}</li>}
               </ul>
               <button className="btn btn-primary" onClick={handleClick}>
                  Инициализировать
               </button>
            </>
         ) : (
            <h3>
               Чтобы воспользоваться нашим сервисом нужно быть авторизованным
            </h3>
         )}
      </div>
   );
   */
};

export default Main;
