import React from 'react';
import useInput from "./useInput";
import { register } from '../utils/network';
import { useNavigate } from 'react-router-dom';
function RegisterNew() {
    const navigate = useNavigate();
    const [name, handleNameChange] = useInput('');
    const [email, handleEmailChange] = useInput('');
    const [password, handlePasswordChange] = useInput('');
    const [rePassword, handleRePasswordChange] = useInput('');
    const onRegisterHandler = async (event) =>{
        event.preventDefault();
        if(password === rePassword){
          const { error } = await register({name,email,password});
          if (!error) {
              navigate('/')
          }
        }else{
          alert("Password dan konfirmasi password tidak sama")
        }        
    }
    return (
      <form onSubmit={onRegisterHandler} className='login-input'>
        <input placeholder='Masukkan nama...' value={name} onChange={handleNameChange} />
        <input placeholder='Masukkan email...' value={email} onChange={handleEmailChange} />
        <input placeholder='Masukkan password...' value={password} type="password" onChange={handlePasswordChange} />
        <input placeholder='Masukkan ulang password...' value={rePassword} type="password" onChange={handleRePasswordChange} />
        <button>Regis Now</button>
      </form>
    );
}
export default RegisterNew