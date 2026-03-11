import React from 'react';
import enhancedSvg from '../enhancedSvg';

const MenuIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    height="24px" 
    viewBox="0 -960 960 960" 
    width="24px" 
  >
    <path className="fill-target" d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
  </svg>
);

export default enhancedSvg(MenuIcon);
