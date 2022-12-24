import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import Modal from './Modal';
import { useSelector } from 'react-redux';
import { getModalStatus } from '../../store/modalSlice';

const Layout = ({ children }) => {
   const isModal = useSelector(getModalStatus());

   return (
      <div
         className={`relative bg-white text-secondary-dark ${
            isModal ? 'h-screen overflow-hidden' : ''
         }`}
      >
         {isModal && <Modal />}
         <div className="md:container min-h-screen px-2 m-auto flex  flex-col justify-between divide-y divide-secondary-light ">
            <div className="h-10">
               <Header />
            </div>

            <div className="grow py-3">{children}</div>

            <div className="h-12">
               <Footer />
            </div>
         </div>
      </div>
   );
};

Layout.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ])
};

export default Layout;
