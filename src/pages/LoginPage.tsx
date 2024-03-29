import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';
import { AppDispatch, RootState } from '../redux/store';

export const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const status = useSelector((state : RootState) => state.auth.status);
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(checkIsAuth);  //повторить, перед этим там был за хардкожен фолс
  const navigate = useNavigate();

  useEffect(() => {
    if(status) toast(status);
    if(isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
        dispatch(loginUser({username, password}));
        setUsername('');
        setPassword('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
      <h1 className='text-lg text-white text-center'>Authorization</h1>
      <label className='text-xs text-white'>
        Email: 
        <input className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'  
        type='email' placeholder='Enter your email' value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className='text-xs text-white'>
        Password: 
        <input className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'  
        type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button type='submit' className='flex justify-center items-center text-xs bg-gray-400 text-black hover:text-white rounded-sm py-2 px-4'
        onClick={handleSubmit}>
          Login
        </button>
        <Link to='/register' className='flex justify-center items-center text-xs text-white hover:text-black'>
          Don't have account?
        </Link>
      </div>
    </form>
  )
}
