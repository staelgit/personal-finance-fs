import React from 'react';
import PropTypes from 'prop-types';
// import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
   return (
      <div className="bg-white text-secondary-dark">
         <div className="md:container min-h-screen px-2 m-auto flex  flex-col justify-between divide-y divide-secondary-light ">
            <div className="h-10">
               <Header />
            </div>

            <div className="grow pb-3">{children}</div>

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
