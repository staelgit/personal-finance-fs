import React from 'react';
import { NavLink } from 'react-router-dom';

const MainMenu = () => {
   const navItems = [
      { id: 1661327623635, title: 'Главная', to: '/' },
      { id: 1661327667034, title: 'Операции', to: '/app/operations' }
   ];
   return (
      <nav className="space-x-2 h-full flex items-stretch justify-center">
         {navItems.map((navItem) => (
            <NavLink
               exact={navItem.to === '/' && true}
               key={navItem.id}
               className="flex items-center main-menu-item"
               to={navItem.to}
            >
               <div className="px-2 py-1 leading-7 rounded-md hover:bg-secondary-ultralight">
                  {navItem.title}
               </div>
            </NavLink>
         ))}
      </nav>
   );
};

export default MainMenu;
