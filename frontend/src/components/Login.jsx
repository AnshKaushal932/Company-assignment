import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validate if email and password are not empty
    if (!email || !password) {
      console.error('Email and password are required');
      return; // Prevent further execution
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === "00") {
          // Save the token to localStorage upon successful login
          localStorage.setItem('token', data.token);
          // Redirect to profile page upon successful login
          navigate('/profile');
          // Show success notification
          toastr.success('Login successful!');
        } else {
          console.error('Login failed:', data.message);
          toastr.error('Login failed: ' + data.message);
        }
      } else {
        console.error('Login failed:', response.statusText);
        toastr.error('Login failed: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      toastr.error('Error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input className="input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input className="input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <button className="button" type="submit">Login</button>
        </div>
      </form>
      <div className="link">
        <a href="/signup">Don't have an account? Signup</a>
      </div>
    </div>
  );
}

export default Login;
