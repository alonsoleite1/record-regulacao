import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from '../../../../services/api';
import style from "./style.module.scss";


export const FormPesquisaCirugia = ({ buscarCadastro, setBuscarCadastro }) => {
  const [cirugia, setEspecialidade] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onSubmit = async (payloand) => {

    const token = JSON.parse(localStorage.getItem("@token"));
    try {
      const response = await api.get(`/cirugia/${payloand.nome}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBuscarCadastro(true);
      setEspecialidade(response.data);

    } catch (error) {
      toast.error(error.response.data.message);

    } finally {
      reset()
    }

  };

  /* const deletarUnidade = async () => {
     const token = JSON.parse(localStorage.getItem("@token"));
 
     try {
       await api.delete(`/unidade/${unidade.nome}`, {
         headers: {
           Authorization: `Bearer ${token}`
         }
       });
 
     } catch (error) {
       toast.error("Unidade não deletada");
     }
 
     setBuscarCadastro(false);
   };
 
   const updateUnidade = async () => {
     setAtualizar(true);
     setBuscarCadastro(false)
   };*/


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_buscar}>
        <input className={style.input_buscar} type="text"
          {...register("nome", { required: 'Digite o nome do exame/procedimento' })} />
        <button className={style.button_buscar} type="submit" >Buscar</button>
      </form>

      {buscarCadastro ? <ul className={style.ul}>
        <li className={style.card}>
          <input className={style.input_user} type="text"
            value={cirugia.nome} />
          <div className={style.div_button}>
            <button className={style.button_atualizar}>Atualizar</button>
            <button className={style.button_deletar}><FaRegTrashAlt /></button>
          </div>
        </li>
      </ul> : null}
    </>
  )
};