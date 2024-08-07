import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DefaultTemplate } from '../../../DefaultTemplate';
import { RiSave3Fill } from "react-icons/ri";
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FormPesquisaUnidade } from '../formBusca';
import style from "./style.module.scss";

export const CadastroUnidade = () => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();

  const [abrirCadastro, setAbrirCadastro] = useState(false);
  const [buscarCadastro, setBuscarCadastro] = useState(false);
  const [atualizar, setAtualizar] = useState(false);

  const navigate = useNavigate();

  const cadastrar = async () => {
    setBuscarCadastro(false);
    setAbrirCadastro(true);
    setAtualizar(false);
  };


  const onSubmit = async (formData) => {
    const token = JSON.parse(localStorage.getItem("@token"));

    try {
      const { data } = await api.post("/unidade", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Unidade criada com sucesso!");
      setAbrirCadastro(false);
      navigate("/inicio");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };



  return (
    <DefaultTemplate>
      <section className={style.section}>

        <div className={style.header}>
          <h1 className={style.title}>Unidades</h1>
          <div className={style.div_button}>
            <button className={style.button_cadastrar} onClick={() => cadastrar()}>+ Cadastrar</button>
          </div>
        </div>

        <FormPesquisaUnidade buscarCadastro={buscarCadastro} atualizar={atualizar} setAtualizar={setAtualizar} setBuscarCadastro={setBuscarCadastro} setAbrirCadastro={setAbrirCadastro} />

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
              <label className={style.label}>Rua:</label>
              <input className={style.input}
                {...register('rua', { required: 'Rua é obrigatório' })}
              />
              {errors.rua && <span className={style.aviso}>{errors.rua.message}</span>}
            </div>

            <div className={style.box_input}>
              <label className={style.label}>Número:</label>
              <input className={style.input}
                {...register('numero', { required: 'Número é obrigatório' })}
              />
              {errors.numero && <span className={style.aviso}>{errors.numero.message}</span>}
            </div>

            <div className={style.box_input}>
              <label className={style.label}>Bairro:</label>
              <input className={style.input}
                {...register('bairro', { required: 'Bairro é obrigatório' })}
              />
              {errors.bairro && <span className={style.aviso}>{errors.bairro.message}</span>}
            </div>

            <div className={style.box_input}>
              <label className={style.label}>Cidade:</label>
              <input className={style.input}
                {...register('cidade', { required: 'Cidade é obrigatório' })}
              />
              {errors.cidade && <span className={style.aviso}>{errors.cidade.message}</span>}
            </div>

            <div className={style.box_input}>
              <label className={style.label}>Estado:</label>
              <input className={style.input}
                {...register('estado', { required: 'Estado é obrigatório' })}
              />
              {errors.estado && <span className={style.aviso}>{errors.estado.message}</span>}
            </div>

          </div>
          <button className={style.button} type="submit"><RiSave3Fill /> Salvar unidade</button>
        </form> : null}
      </section>
    </DefaultTemplate>
  );
};
