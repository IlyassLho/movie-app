import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <div className="logo">
        🎬 Ily<span>Flicks</span>
      </div>
      <nav className="main-nav">
        <ul>
          <li><a href="/">Home</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;