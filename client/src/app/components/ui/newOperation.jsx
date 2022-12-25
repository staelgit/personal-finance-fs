import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, FormikProvider, Field } from 'formik';
import { getAuthErrors, getCurrentUserId } from '../../store/authSlice';
import { clearMessage, setMessage } from '../../store/messageSlice';
import SpinLoading from '../common/SpinLoader';
import TextField from '../common/inputs/TextInput';
import Card from '../common/Card';
import Alert from '../common/Alert';
import { getCategories } from '../../store/categorySlice';
import { getAccounts } from '../../store/accounSlice';
import { MultiSelectField } from '../common/inputs/MultiSelectField';
import {
   createOperation,
   getOperationById,
   updateOperation
} from '../../store/operationSlice';
import { getModalData, setModalOff } from '../../store/modalSlice';
import Button from '../common/Button';
import transformDate from '../../utils/transformDate';

const newOperationSchema = Yup.object({
   date: Yup.date().required('Не может быть пустым'),
   categoryId: Yup.string().required('Не может быть пустым'),
   accountId: Yup.string().required('Не может быть пустым'),
   amount: Yup.number()
      .typeError('Должно быть числом')
      .positive('Должно быть положительным')
      .required('Не может быть пустым'),
   comment: Yup.string()
});

const NewOperation = () => {
   const data = useSelector(getModalData());
   const { type, title, componentId } = data;

   const [loading, setLoading] = useState(false);
   const message = useSelector(getAuthErrors());
   const categories = useSelector(getCategories());
   const accounts = useSelector(getAccounts());
   const dispatch = useDispatch();
   const currentUserId = useSelector(getCurrentUserId());

   let initialValues;

   if (type === 'update') {
      const updateOperation = useSelector(getOperationById(componentId));
      const { _id, date, categoryId, accountId, type, amount, comment } =
         updateOperation;

      initialValues = {
         _id,
         date: transformDate(date, 'forInput'),
         categoryId,
         accountId,
         type,
         amount,
         comment
      };
   } else {
      initialValues = {
         date: '',
         categoryId: '',
         accountId: '',
         type,
         amount: '',
         comment: ''
      };
   }

   useEffect(() => {
      dispatch(clearMessage());
   }, [dispatch]);

   const categoriesOptions = categories
      .filter((c) => c.type === initialValues.type)
      .map((c) => {
         return { value: c._id, label: c.title };
      });

   const accountsOptions = accounts.map((a) => {
      return { value: a._id, label: a.title };
   });

   const handleSubmit = async (formValues) => {
      const newOperation = transformData(formValues);

      setLoading(true);

      try {
         type === 'update'
            ? await dispatch(updateOperation(newOperation))
            : await dispatch(createOperation(newOperation, currentUserId));
         dispatch(setModalOff());
      } catch (error) {
         dispatch(setMessage(error.message));
      } finally {
         setLoading(false);
      }
   };

   const transformData = (formValues) => {
      const date = transformDate(formValues.date, 'forDatabase');
      const amount = Number(Number(formValues.amount).toFixed(2));
      return { ...formValues, date, amount };
   };

   const formik = useFormik({
      initialValues,
      validationSchema: newOperationSchema,
      onSubmit: handleSubmit
   });

   return (
      <>
         <Card className="w-96 pt-5 pb-6 bg-white">
            <Card.Title>{title}</Card.Title>
            <FormikProvider value={formik}>
               <form
                  className="space-y-3 min-w-[200px] w-full"
                  onSubmit={formik.handleSubmit}
               >
                  <TextField
                     label="Дата"
                     name="date"
                     type="date"
                     customClasses={'h-9'}
                  />
                  <Field
                     label="Категория"
                     name="categoryId"
                     component={MultiSelectField}
                     options={categoriesOptions}
                  />
                  <Field
                     label="Кошелек"
                     name="accountId"
                     component={MultiSelectField}
                     options={accountsOptions}
                  />
                  <TextField
                     label="Сумма"
                     name="amount"
                     customClasses={'h-9'}
                  />
                  <TextField
                     label="Комментарий"
                     name="comment"
                     customClasses={'h-9'}
                  />
                  <div className="pt-2 flex justify-between">
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

export default NewOperation;
