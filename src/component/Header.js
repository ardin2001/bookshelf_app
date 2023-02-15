import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';
import LocaleContext from '../context/LocaleContext';
import ThemeContext from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header({logout,name}) {
  const { localeContext, toggleLocaleContext} = React.useContext(LocaleContext);
  const { themeContext, toggleThemeContext } = React.useContext(ThemeContext);
  if(name === undefined){
    return (
      <nav>
        <ul>        
          <li><Link to="/">{localeContext === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></li>
          <div className='right'>
          <li><button onClick={toggleThemeContext}>{themeContext === 'light' ? <FaMoon /> : <FaSun />}</button></li>
            <li><button onClick={toggleLocaleContext}>{localeContext === 'id' ? 'en' : 'id'}</button></li>
          </div>
        </ul>
      </nav>
    )
  }
  return (
    <nav>
      <ul>
        <li><Link to="/">{localeContext === 'id' ? 'Beranda' : 'Home'}</Link></li>
        <li><Link to="/add">{localeContext === 'id' ? 'Tambah Catatan' : 'Add Note'}</Link></li>
        <li><Link to="/archived">{localeContext === 'id' ? 'Arsipkan' : 'Archived'}</Link></li>
        <div className='right'>
          <li><button onClick={toggleThemeContext}>{themeContext === 'light' ? <FaMoon /> : <FaSun />}</button></li>
          <li><button onClick={toggleLocaleContext}>{localeContext === 'id' ? 'en' : 'id'}</button></li>
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