import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Register.css';

type CreateUserInputs = {
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserInputs>();
  const [message, setMessage] = useState('');

  const onSubmit = async (data: CreateUserInputs) => {
    try {
      const res = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage('✅ משתמש נוצר בהצלחה');
      } else {
        const error = await res.json();
        setMessage('❌ שגיאה: ' + error.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ שגיאה בשרת');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2>יצירת משתמש חדש</h2>

        <div className="form-group">
          <label>אימייל:</label>
          <input type="email" {...register("email", { required: "שדה חובה" })} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>סיסמה:</label>
          <input type="password" {...register("password", { required: "שדה חובה" })} />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="auth-btn">צור משתמש</button>

        {message && <p className={`message ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</p>}

        <p className="switch-auth">
          כבר יש לך משתמש? <Link to="/login">התחבר כאן</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
