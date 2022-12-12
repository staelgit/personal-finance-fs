/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: {
               light: '#bae6fd', // sky-200
               DEFAULT: '#38bdf8', // sky-400
               dark: '#0284c7' // sky-600
            },
            secondary: {
               ultralight: '#f3f4f6', // gray-100
               light: '#e5e7eb', // gray-200
               DEFAULT: '#9ca3af', // gray-400
               dark: '#4b5563' // gray-600
            },
            success: {
               ultralight: '#dcfce7', // Green-100
               light: '#bbf7d0', // Green-200
               DEFAULT: '#4ade80', // Green-400
               dark: '#16a34a', // Green-600
               darkest: '#14532d' // Green-900
            },
            danger: {
               ultralight: '#fee2e2', // red-100
               light: '#fecaca', // red-200
               DEFAULT: '#f87171', // red-400
               dark: '#dc2626', // red-600
               darkest: '#7f1d1d' // red-900
            }
         }
      }
   },
   plugins: []
};
