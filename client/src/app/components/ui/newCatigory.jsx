import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, FormikProvider } from 'formik';
import { getAuthErrors, getCurrentUserId } from '../../store/authSlice';
import { clearMessage, setMessage } from '../../store/messageSlice';
import SpinLoading from '../common/SpinLoader';
import TextField from '../common/inputs/TextInput';
import Card from '../common/Card';
import Alert from '../common/Alert';
import {
   createCategory,
   getCategoryById,
   updateCategory
} from '../../store/categorySlice';

import { getModalData, setModalOff } from '../../store/modalSlice';
import Button from '../common/Button';

const newCategorySchema = Yup.object({
   title: Yup.string()
      .required('Required')
      .min(3, 'Должно быть минимум 3 буквы')
});

const NewCategory = () => {
   const data = useSelector(getModalData());
   const { type, subtype, title, componentId } = data;

   const [loading, setLoading] = useState(false);
   const message = useSelector(getAuthErrors());
   const dispatch = useDispatch();
   const currentUserId = useSelector(getCurrentUserId());

   let initialValues;

   if (type === 'update') {
      const updateCategory = useSelector(getCategoryById(componentId));

      const { _id, title } = updateCategory;

      initialValues = {
         _id,
         title
      };
   } else {
      initialValues = {
         type: subtype,
         title: ''
      };
   }

   useEffect(() => {
      dispatch(clearMessage());
   }, [dispatch]);

   const handleSubmit = async (formValues) => {
      setLoading(true);
      try {
         type === 'update'
            ? await dispatch(updateCategory(formValues))
            : await dispatch(createCategory(formValues, currentUserId));
         dispatch(setModalOff());
      } catch (error) {
         dispatch(setMessage(error.message));
      } finally {
         setLoading(false);
      }
   };

   const formik = useFormik({
      initialValues,
      validationSchema: newCategorySchema,
      onSubmit: handleSubmit
   });

   return (
      <>
         <Card className="w-[32rem] pt-5 pb-6 bg-white">
            <Card.Title>{title}</Card.Title>
            <FormikProvider value={formik}>
               <form
                  className="space-y-3 min-w-[200px] w-full mt-6"
                  onSubmit={formik.handleSubmit}
               >
                  <TextField label="Наименование" name="title" />

                  <div className="pt-6 flex justify-between">
                     <Button
                        disabled={loading}
                        type="submit"
                        className="w-6/12"
                     >
                        {loading && <SpinLoading />} Сохранить
                     </Button>
                     <Button
                        buttonType="cancel"
                        onClick={() => dispatch(setModalOff())}
                        type="button"
                        className="ml-2 w-6/12"
                     >
                        Отмена
                     </Button>
                  </div>
               </form>

               {message && <Alert type={'danger'}>{message}</Alert>}
            </FormikProvider>
         </Card>
      </>
   );
};

export default NewCategory;
