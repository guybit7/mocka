import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './register.scss';
import { useMutation } from '@tanstack/react-query';
import { register } from '../http';

export function Register() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    username: '',
  });

  const { mutate: signinHandler } = useMutation({
    mutationFn: ({ formData }) => register({ formData }),
    onSuccess: data => {
      console.log(data);
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

  return (
    <div className="h-full flex flex-col bg-slate-500 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded p-5 justify-center text-black md:w-1/3 max-w-sm gap-3"
      >
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded text-black"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email Address"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded text-black"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded text-black"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="User Name"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded text-black"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button
          className=" bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
