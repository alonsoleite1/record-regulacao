import React from 'react';
import { useForm } from 'react-hook-form';
import logo from "../../assets/logo.png"
import style from "./style.module.scss";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  
  const Navigate = useNavigate();
  
  const onSubmit = data => {
    console.log(data);
    Navigate("/dashboard")
    // Aqui você pode adicionar a lógica para lidar com o login, como chamar uma API
  };


  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.login_form}>
        <div className={style.title}><img src={logo} alt="logo" /></div>
        <div className={style.box_input}>
          <label className={style.label}>Login</label>
          <input className={style.input}
            {...register('login', { required: 'Login é obrigatório' })}
          />
          {errors.login && <span className={style.aviso}>{errors.login.message}</span>}
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Senha</label>
          <input className={style.input}
            type="password"
            {...register('password', { required: 'Senha é obrigatória' })}
          />
          {errors.password && <span className={style.aviso}>{errors.password.message}</span>}
        </div>
        <button className={style.button} type="submit">Entrar</button>
        <span className={style.version}>Versão do sistema: 1.0.0</span>
      </form>
    </div>
  );
};