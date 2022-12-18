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
import { useHistory /*, useLocation */ } from 'react-router-dom';
import { getCategories } from '../../store/categorySlice';
import { getAccounts } from '../../store/accounSlice';
import { MultiSelectField } from '../common/inputs/MultiSelectField';
import { createOperation } from '../../store/operationSlice';

const signUpSchema = Yup.object({
   date: Yup.date().required('Required'),
   categoryId: Yup.string().required('Required'),
   accountId: Yup.string().required('Required'),
   amount: Yup.number()
      .typeError('There must be a number')
      .positive('Must be a positive')
      .required('Required'),
   comment: Yup.string()
});

const initialValues = {
   date: '',
   categoryId: '',
   accountId: '',
   amount: '',
   comment: ''
};

const NewOperation = () => {
   // const location = useLocation();
   const history = useHistory();
   // const type = location.state.state.type;
   const type = 'income';
   const [loading, setLoading] = useState(false);
   const message = useSelector(getAuthErrors());
   const categories = useSelector(getCategories());
   const accounts = useSelector(getAccounts());
   const dispatch = useDispatch();
   const currentUserId = useSelector(getCurrentUserId());
   // console.log('categories:', categories);
   console.log('accounts:', accounts);
   console.log('currentUserId:', currentUserId);

   console.log('type:', type);
   useEffect(() => {
      dispatch(clearMessage());
   }, [dispatch]);

   const categoriesOptions = categories
      .filter((c) => c.type === type)
      .map((c) => {
         return { value: c._id, label: c.title };
      });
   // console.log('options:', options);

   const accountsOptions = accounts.map((a) => {
      return { value: a._id, label: a.title };
   });
   console.log('accountsOptions:', accountsOptions);

   const handleSubmit = async (formValues) => {
      console.log('handleSubmit:');
      const newOperation = transformData(formValues);
      console.log('newOperation:', newOperation);

      setLoading(true);
      // setSuccessful(false);
      try {
         dispatch(createOperation(newOperation, currentUserId));
         // setSuccessful(true);
         history.goBack();
      } catch (error) {
         dispatch(setMessage(error.message));
         // setSuccessful(false);
      } finally {
         setLoading(false);
      }
   };

   const transformData = (formValues) => {
      const date = new Date(formValues.date).getTime().toString();
      const amount = Number(Number(formValues.amount).toFixed(2));
      return { ...formValues, date, amount, type };
   };

   const formik = useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: handleSubmit
   });

   return (
      <>
         <Card className="m-auto mt-3 w-96 pt-3 pb-5 bg-white">
            <Card.Title>{`New ${type}`}</Card.Title>
            <FormikProvider value={formik}>
               {/* {!successful && ( */}
               <form
                  className="space-y-3 min-w-[200px] w-full"
                  onSubmit={formik.handleSubmit}
               >
                  <TextField
                     label="Date"
                     name="date"
                     type="date"
                     customClasses={'h-9'}
                  />
                  <Field
                     label="Category"
                     name="categoryId"
                     component={MultiSelectField}
                     options={categoriesOptions}
                  />
                  <Field
                     label="Account"
                     name="accountId"
                     component={MultiSelectField}
                     options={accountsOptions}
                  />
                  <TextField
                     label="Amount"
                     name="amount"
                     customClasses={'h-9'}
                  />
                  <TextField
                     label="Comment"
                     name="comment"
                     customClasses={'h-9'}
                  />
                  <div className="pt-2 flex">
                     <button
                        disabled={loading}
                        type="submit"
                        className="flex justify-center items-center w-24 p-3 bg-success rounded text-white hover:bg-success-dark"
                     >
                        {loading && <SpinLoading />} Create
                     </button>
                     <button
                        onClick={() => history.goBack()}
                        className="ml-2 flex justify-center items-center w-24 p-3 bg-danger rounded text-white hover:bg-danger-dark"
                     >
                        Cancel
                     </button>
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
