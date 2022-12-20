import React, { useState } from 'react';
// import LoginForm from '../components/ui/loginForm';
// import RegisterForm from '../components/ui/registerForm';
import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import LoginPage from '../components/ui/LoginPage';
import SignupPage from '../components/ui/SignupPage';
import StyledNavLink from '../components/ui/StyledNavLink';

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
            <Card className="m-auto mt-3 w-96">
               {/* <Card.Title>Register</Card.Title> */}
               {/* <RegisterForm /> */}
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
            <Card className="m-auto mt-8 w-96">
               {/* <Card.Title>Login</Card.Title> */}
               {/* <LoginForm /> */}
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
