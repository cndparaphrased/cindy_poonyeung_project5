import React from 'react';
import './_header.scss';

const Header = () => {
  return(
    <header className="headerMain">
      <div className="logo">
        <img src={window.location.origin + '/assets/mind-logo.png'} alt="Dot and line tracing of a human brain" />
      </div>
      <h1>Mind on a Shelf</h1>
      <h2>Store your worries.</h2>
    </header>
  )
}

export default Header;