import React from 'react';
import './_footer.scss';

const Footer = () => {
  return (
    <footer className="footerMain">
      <nav className="navContainer">
        <ul className="navMain">
          <li className="navMain__item">
            <a href="#" className="navMain__link">
              <div className="navMain__icon">
                <img src={window.location.origin + '/assets/now.png'} alt="Thought bubble icon"/>
              </div>
              <p className="navMain__label">Now</p>
            </a>
          </li>

          <li className="navMain__item">
            <a href="#" className="navMain__link">
              <div className="navMain__icon">
                <img src={window.location.origin + '/assets/later.png'} alt="Clock icon with arrow moving clockwise"/>
              </div>
              <p className="navMain__label">Later</p>
            </a>
          </li>

          <li className="navMain__item">
            <a href="#" className="navMain__link">
              <div className="navMain__icon">
                <img src={window.location.origin + '/assets/past.png'} alt="Calendar icon"/>
              </div>
              <p className="navMain__label">Past</p>
            </a>
          </li>

          <li className="navMain__item">
            <a href="#" className="navMain__link">
              <div className="navMain__icon">
                <img src={window.location.origin + '/assets/info.png'} alt="Three bars: menu icon"/>
              </div>
              <p className="navMain__label">Info</p>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;