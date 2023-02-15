import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginNew from '../component/LoginNew';
import LocaleContext from '../context/LocaleContext';

function LoginPage({ loginSuccess }) { 
  const {toggleLocaleContext} = React.useContext(LocaleContext);
  return (
    <section className='login-page'>
    {console.log('loading data login')}
      <h2>{toggleLocaleContext === 'id' ? 'Silakan Masuk Untuk Melanjutkan' : "Please Login To Continue"}</h2>
      <p style={{color : 'red', textAlign : 'center', paddingTop : '10px'}}>{toggleLocaleContext === 'id' ? 'Harap gunakan perangkat desktop karena website tidak responsive' : "Please use a desktop device because the website is not responsive"}</p>
      <LoginNew loginSuccess={loginSuccess}/>
      <p className='note'>{toggleLocaleContext === 'id' ? 'Belum punya akun? ' : "Don't have an account yet? "}
        <Link to="/register">{toggleLocaleContext === 'id' ? 'Daftar di sini.' : "Register here."}</Link>
      </p>
    </section>
  );
}
 
LoginPage.propTypes = {
  loginSuccess: PropTypes.func,
}
 
export default LoginPage;