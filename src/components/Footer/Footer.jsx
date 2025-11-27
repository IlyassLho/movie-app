import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="main-footer">
      <p>
        &copy; {currentYear} Ily Flicks. All rights reserved.
      </p>
      <p>
        Developed by Ilyass.
      </p>
    </footer>
  );
}

export default Footer;