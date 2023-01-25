import React from 'react';
import { Link} from 'react-router-dom';
import RegisterNew from '../component/RegisterNew';
import LocaleContext from '../context/LocaleContext';
 
function RegisterPage() {
  const {locale} = React.useContext(LocaleContext);
  return (
    <section className='register-page'>
    {console.log('loading data register')}
      <h2>{locale === 'id' ? 'Silakan Mendaftar Untuk Melanjutkan' : "Please Register To Continue"}</h2>
      <RegisterNew/>
      <p className='note'>{locale === 'id' ? 'Kembali ke ' : "Back to "}<Link to="/">{locale === 'id' ? 'Masuk' : "Login"}</Link></p>
    </section>
  )
}
 
export default RegisterPage;