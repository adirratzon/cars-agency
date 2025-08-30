import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const user = await res.json();
    if (user.role === 'admin') {
      localStorage.setItem('userEmail', user.email);
      navigate('/admin/list');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2>התחברות</h2>

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

        <button type="submit" className="auth-btn">התחבר</button>

        <p className="switch-auth">
          אין לך עדיין משתמש? <Link to="/register">הרשם כאן</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
