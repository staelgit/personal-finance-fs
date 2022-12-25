import React from 'react';
// Libraries
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, FormikProvider } from 'formik';

// Store
import { getAuthErrors, signIn } from '../../store/authSlice';

// Components

import FormsButton from '../common/FormsButton';
import TextField from '../common/inputs/TextInput';
import Card from '../common/Card';

// Icons
import { KeyIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Alert from '../common/Alert';
import { useHistory } from 'react-router-dom';

const validationSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email address').required('Required'),
   password: Yup.string().required('This field is required!')
});

const initialValues = {
   email: '',
   password: ''
};

const LoginPage = () => {
   const message = useSelector(getAuthErrors());
   const history = useHistory();
   const dispatch = useDispatch();

   const handleLogin = async (formValue) => {
      const redirect = history.location.state
         ? history.location.state.from.pathname
         : '/';
      dispatch(signIn({ payload: formValue, redirect }));
   };

   const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: handleLogin
   });

   return (
      <>
         <div className="text-slate-900">
            <Card.Title>Войти</Card.Title>
            <FormikProvider value={formik}>
               <form
                  className="space-y-6 min-w-[200px] w-full"
                  onSubmit={formik.handleSubmit}
               >
                  <TextField label="Почта" name="email" icon={EnvelopeIcon} />
                  <TextField
                     label="Пароль"
                     name="password"
                     type="password"
                     icon={KeyIcon}
                  />
                  <div className="pt-2">
                     <FormsButton>Войти</FormsButton>
                  </div>
               </form>

               {message && <Alert type="danger">{message}</Alert>}
            </FormikProvider>
         </div>
      </>
   );
};

export default LoginPage;
