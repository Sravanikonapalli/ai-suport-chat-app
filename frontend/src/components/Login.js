import { useState } from 'react';
import axios from 'axios';
import '../App.css'
export default function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      onLogin();
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="login-form">
      <h3>Login</h3>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
      <button className="btn" onClick={login}>Login</button><br />
      <button onClick={onSwitchToSignup}>Don't have an account? Signup</button>
    </div>
  );
}
