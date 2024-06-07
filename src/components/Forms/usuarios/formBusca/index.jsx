import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegTrashAlt } from "react-icons/fa";
import style from "./style.module.scss";
import { api } from '../../../../services/api';


export const FormPesquisaUsuario = () => {
  const [buscarCadastro, setBuscarCadastro] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    const token = JSON.parse(localStorage.getItem("@token"));

    const { data } = await api.get("/usuario/cpf", {
      params:{
        cpf:formData
      }
    });

    console.log(data);
    setInputValue(formData.cpf);
    setBuscarCadastro(true);
  };


  const deletarUsuario = (event) => {

  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_buscar}>
        <input className={style.input_buscar} type="text"
          {...register("cpf")} />
        <button className={style.button_buscar} type="submit" >Buscar</button>
      </form>

      {buscarCadastro ? <ul className={style.ul}>
        <li className={style.card}>
          <input className={style.input_user} type="text"
            value={inputValue} />
          <div className={style.div_button}>
            <button className={style.button_atualizar} onClick={() => cadastrar()}>Atualizar</button>
            <button className={style.button_deletar}><FaRegTrashAlt /></button>
          </div>
        </li>
      </ul> : null}
    </>
  )
};