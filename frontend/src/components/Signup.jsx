import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 // Import toastrService
 import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './styles.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === '00') {
        // Signup successful
        toastr.success('Signup successful! Please login.');
        navigate('/login');
      } else {
        // Signup failed
        toastr.error('Signup failed.User already exists');
      }
    } catch (error) {
      console.error('Error:', error);
      toastr.error('Error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input className="input" type="text" autoComplete='off' name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input className="input" type="email" autoComplete='off'name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input className="input" type="password" autoComplete='off' name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>

        <div className="form-group">
          <button className="button" type="submit">Signup</button>
        </div>
      </form>
      <div className="link">
        <a href="/login">Already have an account? Login</a>
      </div>
    </div>
  );
}

export default Signup;
