import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png'
          alt=''
        />
        <div className='login__text'>
          <h1>Signin to whatsapp</h1>
        </div>
        <Button type='submit' onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
