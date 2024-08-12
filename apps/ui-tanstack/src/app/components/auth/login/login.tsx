import { useState } from 'react';
import './login.scss';
import { useMutation } from '@tanstack/react-query';
import { signin as signinHttp } from '../http';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { mutate: signinHandler } = useMutation({
    mutationFn: ({ formData }) => signinHttp({ formData }),
    onSuccess: data => {
      console.log(data);
      navigation('/');
    },
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    signinHandler({ formData });
  };

  const onRegister = () => {
    navigation('/register');
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <form onSubmit={handleSubmit} className="rounded p-5 w-full flex justify-center">
        <div className="md:w-1/3 max-w-sm">
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded text-black"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 text-black"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1 text-black" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">
              Forgot Password?
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don&apos;t have an account?{' '}
            <a className="text-red-600 hover:underline hover:underline-offset-4" onClick={onRegister}>
              Register
            </a>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
