import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiHome, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import LocaleContext from '../context/LocaleContext';
import ThemeContext from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
function Navigation({ logout,name }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { locale, toggleLocale} = React.useContext(LocaleContext);
  return (
    <nav className="navigation">
      <ul>
        <li><button onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button></li>
        <li><button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button></li>
        <li><Link to="/"><FiHome /></Link></li>
        <li><Link to="/add"><FiPlusCircle /></Link></li>
        <li><button onClick={logout}> {name} <FiLogOut /></button></li>
      </ul>
    </nav>    
  );
}
 
Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
 
export default Navigation;