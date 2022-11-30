import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginNew from '../component/LoginNew';
import LocaleContext from '../context/LocaleContext';

function LoginPage({ loginSuccess }) { 
  const {locale} = React.useContext(LocaleContext);
  return (
    <section className='login-page'>
      <h2>{locale === 'id' ? 'Silakan Masuk Untuk Melanjutkan' : "Please Login To Continue"}</h2>
      <LoginNew loginSuccess={loginSuccess}/>
      <p className='note'>{locale === 'id' ? 'Belum punya akun? ' : "Don't have an account yet? "}
        <Link to="/register">{locale === 'id' ? 'Daftar di sini.' : "Register here."}</Link>
      </p>
    </section>
  );
}
 
LoginPage.propTypes = {
  loginSuccess: PropTypes.func,
}
 
export default LoginPage;