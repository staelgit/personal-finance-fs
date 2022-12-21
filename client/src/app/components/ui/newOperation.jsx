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
// import { useHistory /*, useLocation */ } from 'react-router-dom';
import { getCategories } from '../../store/categorySlice';
import { getAccounts } from '../../store/accounSlice';
import { MultiSelectField } from '../common/inputs/MultiSelectField';
import {
   createOperation,
   getOperationById,
   updateOperation
} from '../../store/operationSlice';
import { getModalData, setModalOff } from '../../store/modalSlice';
import Button from './Button';
import transformDate from '../../utils/transformDate';

const newOperationSchema = Yup.object({
   date: Yup.date().required('Required'),
   categoryId: Yup.string().required('Required'),
   accountId: Yup.string().required('Required'),
   amount: Yup.number()
      .typeError('There must be a number')
      .positive('Must be a positive')
      .required('Required'),
   comment: Yup.string()
});

const NewOperation = () => {
   const data = useSelector(getModalData());
   const { type, title, componentId } = data;
   console.log('data:', data);

   // const history = useHistory();
   const [loading, setLoading] = useState(false);
   const message = useSelector(getAuthErrors());
   const categories = useSelector(getCategories());
   const accounts = useSelector(getAccounts());
   const dispatch = useDispatch();
   const currentUserId = useSelector(getCurrentUserId());

   let initialValues;

   if (type === 'update') {
      const updateOperation = useSelector(getOperationById(componentId));
      console.log('updateOperation:', updateOperation);
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
   // console.log('initialValues:', initialValues);
   // console.log('categories:', categories);
   // console.log('accounts:', accounts);

   useEffect(() => {
      dispatch(clearMessage());
   }, [dispatch]);

   const categoriesOptions = categories
      .filter((c) => c.type === initialValues.type)
      .map((c) => {
         return { value: c._id, label: c.title };
      });
   // console.log('categoriesOptions:', categoriesOptions);

   const accountsOptions = accounts.map((a) => {
      return { value: a._id, label: a.title };
   });
   // console.log('accountsOptions:', accountsOptions);

   const handleSubmit = async (formValues) => {
      // console.log('handleSubmit:');
      // console.log('formValues:', formValues);
      const newOperation = transformData(formValues);
      console.log('newOperation:', newOperation);

      setLoading(true);
      // setSuccessful(false);
      try {
         type === 'update'
            ? await dispatch(updateOperation(newOperation))
            : await dispatch(createOperation(newOperation, currentUserId));
         dispatch(setModalOff());
         // setSuccessful(true);
         // history.push('/app/operations');
      } catch (error) {
         dispatch(setMessage(error.message));
         // setSuccessful(false);
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
               {/* {!successful && ( */}
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
               {/* )} */}
               {message && (
                  // <Alert type={successful ? 'success' : 'danger'}>{message}</Alert>
                  <Alert type={'danger'}>{message}</Alert>
               )}
            </FormikProvider>
         </Card>
      </>
   );
};

export default NewOperation;
