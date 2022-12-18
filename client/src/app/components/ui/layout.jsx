import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
// import NewOperation from './newOperation';

const Layout = ({ children }) => {
   return (
      <div className="bg-white text-secondary-dark">
         {/*       <div className="modal absolute flex justify-center items-center bg-black/50 w-full h-full z-20">
            <div>
               <NewOperation />
            </div>
         </div> */}
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
