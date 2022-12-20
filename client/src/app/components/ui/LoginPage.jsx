import React from 'react';
// Libraries
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, FormikProvider } from 'formik';
// import { useLocation, useNavigate } from 'react-router-dom';
// Store
import { getAuthErrors, signIn } from '../../store/authSlice';
// import { clearMessage /*, setMessage */ } from '../../store/messageSlice';
// Components
// import SpinLoading from '../common/SpinLoader';
import Button from '../common/Button';
import TextField from '../common/inputs/TextInput';
import Card from '../common/Card';
// import history from '../../utils/history';
// import { useAuth } from '../../hooks/useAuth';
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
   // const [loading, setLoading] = useState(false);
   // const loading = useSelector(getUsersLoadingStatus());
   // const { message } = useSelector((state) => state.message);
   const message = useSelector(getAuthErrors());
   // const navigate = useNavigate();
   const history = useHistory();
   // const location = useLocation();
   // const { signIn } = useAuth();
   const dispatch = useDispatch();

   // console.log('message:', message);

   // useEffect(() => {
   //    dispatch(clearMessage());
   // }, [dispatch]);

   const handleLogin = async (formValue) => {
      /* setLoading(true);
      const redirect = location.state ? location.state.referrer.pathname : '/';
      try {
         await signIn(formValue);
         // history.push(
         //    history.location.state ? history.location.state.from.pathname : '/'
         // );
         navigate(redirect, { replace: true });
      } catch (error) {
         dispatch(setMessage(error.message));
      } finally {
         setLoading(false);
      } */
      // console.log(history);
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
                     <Button>Войти</Button>
                     {/*                     <Button disabled={loading}>
                        {loading && <SpinLoading />} Log In
                     </Button> */}
                  </div>
               </form>

               {message && <Alert type="danger">{message}</Alert>}
            </FormikProvider>
         </div>
      </>
   );
};

export default LoginPage;
