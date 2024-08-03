import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import logo from "../../assets/logo.png";
import { UsuarioContext } from '../../provider/UsuarioContext';
import style from "./style.module.scss";

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { login } = useContext(UsuarioContext);

  const onSubmit = (formData) => {
    login(formData)
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
            {...register('senha', { required: 'Senha é obrigatória' })}
          />
          {errors.senha && <span className={style.aviso}>{errors.senha.message}</span>}
        </div>
        <button className={style.button} type="submit">Entrar</button>
        <span className={style.version}>Versão do sistema: 1.0.0</span>
      </form>
    </div>
  );
};