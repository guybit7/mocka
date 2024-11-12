import { useState } from 'react';
import './login.scss';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  } as any);

  const { mutate: signinHandler } = useMutation({
    mutationFn: ({ formData }: any) =>
      fetch('http://localhost:3000/api/auth/login', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Send data as JSON
        },
        body: JSON.stringify(formData), // Convert data object to JSON string
      }), //.post('api/auth/login', JSON.stringify(formData)),
    onSuccess: data => {
      console.log(data);
      navigation('/');
    },
    onError: err => {
      alert(err);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signinHandler({ formData });
  };

  return (
    <section className="">
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <input
            className=""
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address 123"
          />
          <input
            className=""
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />

          <div className="">
            <button className="" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
