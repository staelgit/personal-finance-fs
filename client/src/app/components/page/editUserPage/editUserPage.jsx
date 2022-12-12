import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../../utils/validator';
import TextField from '../../common/form/textField';
import Loader from '../../common/loader';
import BackHistoryButton from '../../common/backButton';
// import { useAuth } from '../../../hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserData, updateUser } from '../../../store/authSlice';
import { useHistory } from 'react-router-dom';

const EditUserPage = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState();
   // const {  currentUser,  updateUserData } = useAuth();
   const [errors, setErrors] = useState({});
   const dispatch = useDispatch();
   const currentUser = useSelector(getCurrentUserData());
   const history = useHistory();

   useEffect(() => {
      if (currentUser && !data) {
         setData(currentUser);
      }
   }, [currentUser]);

   useEffect(() => {
      if (data && isLoading) {
         setIsLoading(false);
      }
   }, [data]);

   const validatorConfig = {
      name: {
         isRequired: {
            massage: 'Поле имя обязательно для заполнения'
         }
      },
      email: {
         isRequired: {
            massage: 'Электронная почта обязательная для заполнения'
         },
         isEmail: {
            massage: 'Неверный email'
         }
      }
   };

   const validate = () => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const isValid = Object.keys(errors).length === 0;

   const handleChange = (target) => {
      setData((prev) => ({
         ...prev,
         [target.name]: target.value
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;
      // await updateUserData(data);
      await dispatch(updateUser(data));
      history.push(`/app/user/${currentUser._id}`);
   };

   return !isLoading ? (
      <div className="container mt-4">
         <BackHistoryButton />
         <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
               <h3 className="mb-3">Редактируем данные пользователя</h3>
               <form onSubmit={handleSubmit}>
                  <TextField
                     onChange={handleChange}
                     name="name"
                     value={data.name}
                     label="Имя (Имя Фамилия)"
                     error={errors.name}
                  />
                  <TextField
                     onChange={handleChange}
                     name="email"
                     value={data.email}
                     label="Электронная почта"
                     error={errors.email}
                  />

                  <button
                     type="submit"
                     disabled={!isValid}
                     className="btn btn-primary w-100 mx-auto"
                  >
                     Обновить
                  </button>
               </form>
            </div>
         </div>
      </div>
   ) : (
      <Loader />
   );
};

EditUserPage.propTypes = {
   id: PropTypes.string
};

export default EditUserPage;
