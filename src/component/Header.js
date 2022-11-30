import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';
import LocaleContext from '../context/LocaleContext';
import ThemeContext from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header({logout,name}) { 
  const { locale, toggleLocale} = React.useContext(LocaleContext);
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  if(name === undefined){
    return (
      <nav>
        <ul>        
          <li><Link to="/">{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></li>
          <div className='right'>
          <li><button onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button></li>
            <li><button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button></li>
          </div>
        </ul>
      </nav>
    )
  }
  return (
    <nav>
      <ul>
        <li><Link to="/">{locale === 'id' ? 'Beranda' : 'Home'}</Link></li>
        <li><Link to="/add">{locale === 'id' ? 'Tambah Catatan' : 'Add Note'}</Link></li>
        <li><Link to="/archived">{locale === 'id' ? 'Arsipkan' : 'Archived'}</Link></li>
        <div className='right'>
          <li><button onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button></li>
          <li><button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button></li>
          <li><button onClick={logout}><FiLogOut /></button>({name})</li>
        </div>
      </ul>
    </nav>
  );
}
Header.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};   
export default Header;