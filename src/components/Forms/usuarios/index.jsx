import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { DefaultTemplate } from '../../DefaultTemplate';
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";

export const CadastroUsuario = () => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const unidadesOptions = [
    { value: 'unidade1', label: 'Unidade 1' },
    { value: 'unidade2', label: 'Unidade 2' },
    { value: 'unidade3', label: 'Unidade 3' }
  ];

  const perfilOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
  ];

  const senha = watch('senha', '');

  return (
    <DefaultTemplate>

    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.container}>
        <div className={style.box_input}>
          <label className={style.label}>Nome:</label>
          <input className={style.input}
            id="nome"
            {...register('nome', { required: 'Nome é obrigatório' })}
          />
          {errors.nome && <span className={style.aviso}>{errors.nome.message}</span>}
        </div>
        <div className={style.box_input}>
          <label className={style.label}>CPF:</label>
          <Controller
            name="cpf"
            control={control}
            rules={{ required: 'CPF é obrigatório' }}
            render={({ field }) => (
              <InputMask
                mask="999.999.999-99"
                value={field.value}
                onChange={field.onChange}
              >
                {(inputProps) => <input className={style.input} {...inputProps} type="text" />}
              </InputMask>
            )}
          />
          {errors.cpf && <span className={style.aviso}>{errors.cpf.message}</span>}
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Login:</label>
          <input  className={style.input}
            id="login"
            {...register('login', { required: 'Login é obrigatório' })}
          />
          {errors.login && <span className={style.aviso}>{errors.login.message}</span>}
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Senha:</label>
          <input className={style.input}
            type="password"
            id="senha"
            {...register('senha', { required: 'Senha é obrigatória' })}
          />
          {errors.senha && <span className={style.aviso}>{errors.senha.message}</span>}
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Confirmação de Senha:</label>
          <input className={style.input}
            type="password"
            id="confirmacaoSenha"
            {...register('confirmacaoSenha', {
              required: 'Confirmação de Senha é obrigatória',
              validate: (value) =>
                value === senha || 'As senhas não correspondem'
            })}
          />
          {errors.confirmacaoSenha && <span className={style.aviso}>{errors.confirmacaoSenha.message}</span>}
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Unidade:</label>
          <Controller
            name="unidade"
            control={control}
            rules={{ required: 'Unidade é obrigatória' }}
            render={({ field }) => (
              <Select 
                {...field}
                options={unidadesOptions}
                placeholder="Selecione a unidade"
              />
            )}
          />
          {errors.unidade && <span className={style.aviso}>{errors.unidade.message}</span>}
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Perfil:</label>
          <Controller 
            name="perfil" 
            control={control}
            rules={{ required: 'Perfil é obrigatório' }}
            render={({ field }) => (
              <Select
                {...field}
                options={perfilOptions}
                placeholder="Selecione o perfil"
              />
            )}
          />
          {errors.perfil && <span className={style.aviso}>{errors.perfil.message}</span>}
        </div>
      </div>

      <button className={style.button} type="submit"><RiSave3Fill /> Salvar usuário</button>
    </form>
    </DefaultTemplate>
  );
};