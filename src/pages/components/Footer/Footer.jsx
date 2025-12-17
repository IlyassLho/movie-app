import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="main-footer">
      <p>
        &copy; {currentYear} Ily Flicks. All rights reserved.
      </p>
      <p>
        Developed by <a href="https://ilyaslhouari.netlify.app/" target='_blank'>ILYAS LHOUARI</a>
      </p>
    </footer>
  );
}

export default Footer;