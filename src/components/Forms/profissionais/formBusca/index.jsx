import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from '../../../../services/api';
import { AtualizarProfissional } from '../formAtualizar';
import style from "./style.module.scss";


export const FormPesquisaProfissional = ({ buscarCadastro, atualizar, setAtualizar, setBuscarCadastro, setAbrirCadastro }) => {
  const [profissional, setProfissionais] = useState("");
  const [especialidades, setEspecialidades] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onSubmit = async (payloand) => {

    const token = JSON.parse(localStorage.getItem("@token"));
    try {
      const response = await api.get(`/profissional/${payloand.cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProfissionais(response.data);
      setBuscarCadastro(true);
      setAbrirCadastro(false);
      setAtualizar(false);

    } catch (error) {
      toast.error(error.response.data.message);

    } finally {
      reset()
    }

  };

  const deletarProfissional = async () => {
    const token = JSON.parse(localStorage.getItem("@token"));

    try {
      await api.delete(`/profissional/${profissional.cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Profissional deletado!!");

    } catch (error) {
      toast.error("Profissional não encontrado!");
    }

    setBuscarCadastro(false);
  };

  const updateProfissional = async () => {
    setAtualizar(true);
    setBuscarCadastro(false);
    setAbrirCadastro(false);

    const arrayEspecialidades = [];

        const exames = await api.get('/exame');

        if(exames.data){
            exames.data.map((element)=>arrayEspecialidades.push(element.nome));
        };

        const especialistas = await api.get('/especialista');
        if(especialistas.data){
            especialistas.data.map((element)=>arrayEspecialidades.push(element.nome));
        };

        const cirurgias = await api.get('/cirugia');
        if(cirurgias.data){
            cirurgias.data.map((element)=>arrayEspecialidades.push(element.nome));
        };

        setEspecialidades(arrayEspecialidades);
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_buscar}>
        <input className={style.input_buscar} type="text"
          {...register("cpf", { required: 'Digite o cpf do profissional' })} />
        <button className={style.button_buscar} type="submit" >Buscar</button>
      </form>

      {buscarCadastro ? <ul className={style.ul}>
        <li className={style.card}>
          <input className={style.input_user} type="text"
            value={profissional.nome} />
          <div className={style.div_button}>
            <button className={style.button_atualizar} onClick={() => updateProfissional()}>Atualizar</button>
            <button className={style.button_deletar} onClick={() => deletarProfissional()}><FaRegTrashAlt /></button>
          </div>
        </li>
      </ul> : null}
      {atualizar ? <AtualizarProfissional profissional={profissional} especialidades={especialidades}/> : null}
    </>
  )
};