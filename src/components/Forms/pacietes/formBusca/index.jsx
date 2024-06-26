import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from '../../../../services/api';
import style from "./style.module.scss";
import { AtualizarCadastro } from '../formAtualizar';


export const FormPesquisaPaciente = ({ buscarCadastro,atualizar, setAtualizar, setBuscarCadastro, setAbrirCadastro }) => {

  const [paciente, setPaciente] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onSubmit = async (payloand) => {

    const token = JSON.parse(localStorage.getItem("@token"));
    try {
      const response = await api.get(`/paciente/${payloand.cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBuscarCadastro(true);
      setPaciente(response.data);
      setAbrirCadastro(false);
      setAtualizar(false);

    } catch (error) {
      toast.error(error.response.data.message);

    } finally {
      reset()
    }

  };

  const deletarPaciente = async () => {
    const token = JSON.parse(localStorage.getItem("@token"));

    try {
      await api.delete(`/paciente/${usuario.cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    } catch (error) {
      toast.error("Paciente não deletado");
    }

    setBuscarCadastro(false);
  };

  const updatePaciente = async () => {
    setAtualizar(true);
    setBuscarCadastro(false);
    setAbrirCadastro(false);
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_buscar}>
        <input className={style.input_buscar} type="text"
          {...register("cpf", { required: 'Digite o cpf' })} />
        <button className={style.button_buscar} type="submit" >Buscar</button>
      </form>

      {buscarCadastro ? <ul className={style.ul}>
        <li className={style.card}>
          <input className={style.input_user} type="text"
            value={paciente.nome} />
          <div className={style.div_button}>
            <button className={style.button_atualizar} onClick={() => updatePaciente()}>Atualizar</button>
            <button className={style.button_deletar} onClick={() => deletarPaciente()}><FaRegTrashAlt /></button>
          </div>
        </li>
      </ul> : null}
      {atualizar ? <AtualizarCadastro paciente={paciente} /> : null}
    </>
  )
};