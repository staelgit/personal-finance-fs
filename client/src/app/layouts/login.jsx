import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import LoginPage from '../components/ui/LoginPage';
import SignupPage from '../components/ui/SignupPage';
import StyledNavLink from '../components/common/StyledNavLink';

const Login = () => {
   const { type } = useParams;
   const [formType, setFormType] = useState(
      type === 'register' ? type : 'login'
   );
   const toggleFormType = () => {
      setFormType((prevState) =>
         prevState === 'register' ? 'login' : 'register'
      );
   };
   return (
      <>
         {formType === 'register' ? (
            <Card className="m-auto mt-40 w-96">
               <SignupPage />
               <div className="mt-3">
                  Уже есть аккаунт?{' '}
                  <StyledNavLink
                     to="login"
                     styleType="underline"
                     className="text-sm text-slate-600"
                     onClick={toggleFormType}
                  >
                     Войти
                  </StyledNavLink>
               </div>
            </Card>
         ) : (
            <Card className="m-auto mt-40 w-96">
               <LoginPage />
               <div className="mt-3">
                  Еще нет аккаунта?{' '}
                  <StyledNavLink
                     to="login"
                     styleType="underline"
                     className="text-sm text-slate-600"
                     onClick={toggleFormType}
                  >
                     Зарегистрироваться
                  </StyledNavLink>
               </div>
            </Card>
         )}
      </>
   );
};

export default Login;
