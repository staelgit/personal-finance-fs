import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../../common/inputs/TextInput';
import Loader from '../../common/loader';
import BackHistoryButton from '../../common/backButton';
import { useSelector, useDispatch } from 'react-redux';
import {
   getAuthErrors,
   getCurrentUserData,
   updateUser
} from '../../../store/authSlice';
import Card from '../../common/Card';
import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import FormsButton from '../../common/FormsButton';
import SpinLoading from '../../common/SpinLoader';
import Alert from '../../common/Alert';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { setMessage } from '../../../store/messageSlice';

const EditUserPage = () => {
   const [loading, setLoading] = useState(false);
   const message = useSelector(getAuthErrors());
   const dispatch = useDispatch();
   const currentUser = useSelector(getCurrentUserData());

   const initialValues = {
      name: currentUser.name,
      email: currentUser.email
   };

   const signUpSchema = Yup.object({
      name: Yup.string()
         .min(3, 'Name must contain at least 3 symbols')
         .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required')
   });

   const handleSubmit = async (formValues) => {
      setLoading(true);
      // setSuccessful(false);
      try {
         dispatch(updateUser({ ...currentUser, ...formValues }));
         // setSuccessful(true);
      } catch (error) {
         dispatch(setMessage(error.message));
         // setSuccessful(false);
      } finally {
         setLoading(false);
      }
   };

   const formik = useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: handleSubmit
   });

   return !loading ? (
      <>
         <Card className="m-auto mt-40 w-96 ">
            <Card.Title>Редактируем пользователя</Card.Title>
            <FormikProvider value={formik}>
               {/* {!successful && ( */}
               <form
                  className="space-y-3 min-w-[200px] w-full"
                  onSubmit={formik.handleSubmit}
               >
                  <TextField label="Имя" name="name" icon={UserIcon} />
                  <TextField label="Почта" name="email" icon={EnvelopeIcon} />
                  <div className="pt-2">
                     <FormsButton disabled={loading}>
                        {loading && <SpinLoading />} Обновить
                     </FormsButton>
                  </div>
               </form>
               {/* )} */}
               {message && (
                  // <Alert type={successful ? 'success' : 'danger'}>{message}</Alert>
                  <Alert type={'danger'}>{message}</Alert>
               )}
            </FormikProvider>
            <BackHistoryButton />
         </Card>
      </>
   ) : (
      <Loader />
   );
};

EditUserPage.propTypes = {
   id: PropTypes.string
};

export default EditUserPage;
