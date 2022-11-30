import React from 'react';
import useInput from "./useInput";
import { login } from '../utils/network';
import PropTypes from 'prop-types';
function LoginNew({loginSuccess}) {
    const [email, handleEmailChange] = useInput('');
    const [password, handlePasswordChange] = useInput('');
    const onSubmitHandler = async (event) =>{
      event.preventDefault();
      const { error, data } = await login({ email, password });
      if (!error) {
        loginSuccess(data);
      }
    }
    return (
      <form onSubmit={onSubmitHandler} className='login-input'>
        <input placeholder='Masukkan email...' value={email} onChange={handleEmailChange} />
        <input placeholder='Masukkan password...' value={password} type="password" onChange={handlePasswordChange} />
        <button>Masuk</button>
      </form>
    );
}
LoginNew.propTypes = {
  loginSuccess: PropTypes.func,
};
export default LoginNew