import { useState } from 'react';
import axios from 'axios';
import '../App.css'
export default function Signup({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      await axios.post('http://localhost:5000/api/signup', { email, password });
      alert('Signup successful. Now login.');
      onSwitchToLogin();
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className='login-form'>
      <h3>Signup</h3>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
      <button className='btn' onClick={signup}>Signup</button><br />
      <button onClick={onSwitchToLogin}>Already have an account? Login</button>
    </div>
  );
}
