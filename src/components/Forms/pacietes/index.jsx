import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { DefaultTemplate } from '../../DefaultTemplate';

export const Pacientes = () => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            {...register('nome', { required: 'Nome é obrigatório' })}
          />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>

        <div>
          <label htmlFor="cpf">CPF:</label>
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
                {(inputProps) => <input {...inputProps} type="text" />}
              </InputMask>
            )}
          />
          {errors.cpf && <span>{errors.cpf.message}</span>}
        </div>

        <div>
          <label htmlFor="login">Login:</label>
          <input
            id="login"
            {...register('login', { required: 'Login é obrigatório' })}
          />
          {errors.login && <span>{errors.login.message}</span>}
        </div>

        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            maxLength={11}
            {...register('senha', { required: 'Senha é obrigatória' })}
          />
          {errors.senha && <span>{errors.senha.message}</span>}
        </div>

        <div>
          <label htmlFor="confirmacaoSenha">Confirmação de Senha:</label>
          <input
            type="password"
            id="confirmacaoSenha"
            {...register('confirmacaoSenha', {
              required: 'Confirmação de Senha é obrigatória',
              validate: (value) =>
                value === senha || 'As senhas não correspondem'
            })}
          />
          {errors.confirmacaoSenha && <span>{errors.confirmacaoSenha.message}</span>}
        </div>

        <div>
          <label htmlFor="unidade">Unidade:</label>
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
          {errors.unidade && <span>{errors.unidade.message}</span>}
        </div>

        <div>
          <label htmlFor="perfil">Perfil:</label>
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
          {errors.perfil && <span>{errors.perfil.message}</span>}
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </DefaultTemplate>

  );
};


