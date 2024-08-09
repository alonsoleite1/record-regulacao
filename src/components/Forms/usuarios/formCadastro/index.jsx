import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { DefaultTemplate } from '../../../DefaultTemplate';
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";
import { api } from '../../../../services/api';
import { FormPesquisaUsuario } from '../formBusca';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const CadastroUsuario = () => {
  const [unidades, setUnidades] = useState([]);
  const { register, handleSubmit, setValue, control, watch, formState: { errors } } = useForm();

  const [abrirCadastro, setAbrirCadastro] = useState(false);
  const [buscarCadastro, setBuscarCadastro] = useState(false);
  const [atualizar, setAtualizar] = useState(false);

  const navigate = useNavigate();

  const cadastrar = async () => {
    setAbrirCadastro(true);
    setBuscarCadastro(false);
    setAtualizar(false);

    const { data } = await api.get('/unidade');

    setUnidades(data);

  };

  const handleChange = (e) => {
    const valor = e.target.value.replace(/[.-]/g, '');
    setValue('cpf', valor);
  };

  const onSubmit = async (formData) => {
    const token = JSON.parse(localStorage.getItem("@token"));

    try {
      const { data } = await api.post("/usuario", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Usuário criado com sucesso!");
      setAbrirCadastro(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const senha = watch('senha', '');

  return (
    <DefaultTemplate>
      <section className={style.section}>

        <div className={style.header}>
          <h1 className={style.title}>USUÁRIOS</h1>
          <div className={style.div_button}>
            <button className={style.button_cadastrar} onClick={() => cadastrar()}>+ Cadastrar</button>
          </div>
        </div>
        <FormPesquisaUsuario buscarCadastro={buscarCadastro} atualizar={atualizar} setAtualizar={setAtualizar} setBuscarCadastro={setBuscarCadastro} setAbrirCadastro={setAbrirCadastro} />

        {abrirCadastro ? <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.container}>
            <div className={style.box_input}>
              <label className={style.label}>Nome:</label>
              <input className={style.input}
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
                    onChange={handleChange}
                  >
                    {(inputProps) => <input className={style.input} {...inputProps} type="text" />}
                  </InputMask>
                )}
              />
              {errors.cpf && <span className={style.aviso}>{errors.cpf.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Login:</label>
              <input className={style.input}
                {...register('login', { required: 'Login é obrigatório' })}
              />
              {errors.login && <span className={style.aviso}>{errors.login.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Senha:</label>
              <input className={style.input}
                type="password"
                {...register('senha', { required: 'Senha é obrigatória' })}
              />
              {errors.senha && <span className={style.aviso}>{errors.senha.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Confirmação de Senha:</label>
              <input className={style.input}
                type="password"
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
              <select className={style.input}  {...register('unidade', { required: 'Unidade é obrigatório' })}
              ><option value="">Selecione unidade</option>
                {unidades.map((option, i) => (
                  <option key={i} value={option.nome}>
                    {option.nome}
                  </option>
                ))}
              </select>
              {errors.unidade && <span className={style.aviso}>{errors.unidade.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Perfil:</label>
              <select className={style.input}  {...register('perfil', { required: 'Perfil é obrigatório' })}>
                <option value="">Selecione o perfil</option>
                <option value="admin">Admin</option>
                <option value="operador">Operador</option>
                <option value="gerencia">Gerencia</option>
              </select>
              {errors.perfil && <span className={style.aviso}>{errors.perfil.message}</span>}
            </div>
          </div>
          <button className={style.button} type="submit"><RiSave3Fill /> Salvar usuário</button>
        </form> : null}
      </section>
    </DefaultTemplate>
  );
};
