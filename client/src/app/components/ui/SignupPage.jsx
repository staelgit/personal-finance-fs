import React, { useState, useEffect } from 'react';
// Libraries
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, FormikProvider } from 'formik';
// Store
import { getAuthErrors, signUp } from '../../store/authSlice';
import { clearMessage, setMessage } from '../../store/messageSlice';
// Components
import SpinLoading from '../common/SpinLoader';
import FormsButton from '../common/FormsButton';
import TextField from '../common/inputs/TextInput';
import Card from '../common/Card';

// Icons
import { UserIcon, KeyIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Alert from '../common/Alert';

const signUpSchema = Yup.object({
   name: Yup.string()
      .min(3, 'Name must contain at least 3 symbols')
      .required('Required'),
   email: Yup.string().email('Invalid email address').required('Required'),
   password: Yup.string()
      .min(8, 'Password must contain at least 8 symbols')
      .required('Required')
});

const initialValues = {
   name: '',
   email: '',
   password: ''
};

const SignUpPage = () => {
   const [loading, setLoading] = useState(false);

   const message = useSelector(getAuthErrors());
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(clearMessage());
   }, [dispatch]);

   const handleSubmit = async (formValues) => {
      setLoading(true);
      try {
         await dispatch(signUp(formValues));
      } catch (error) {
         dispatch(setMessage(error.message));
      } finally {
         setLoading(false);
      }
   };

   const formik = useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: handleSubmit
   });

   return (
      <>
         <Card.Title>Зарегистрироваться</Card.Title>
         <FormikProvider value={formik}>
            <form
               className="space-y-3 min-w-[200px] w-full"
               onSubmit={formik.handleSubmit}
            >
               <TextField label="Имя" name="name" icon={UserIcon} />
               <TextField label="Почта" name="email" icon={EnvelopeIcon} />

               <TextField
                  label="Пароль"
                  name="password"
                  type="password"
                  icon={KeyIcon}
               />
               <div className="pt-2">
                  <FormsButton disabled={loading}>
                     {loading && <SpinLoading />} Sign Up
                  </FormsButton>
               </div>
            </form>

            {message && <Alert type={'danger'}>{message}</Alert>}
         </FormikProvider>
      </>
   );
};

export default SignUpPage;
