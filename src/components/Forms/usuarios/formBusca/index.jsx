import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from '../../../../services/api';
import style from "./style.module.scss";


export const FormPesquisaUsuario = () => {
  const [buscarCadastro, setBuscarCadastro] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (formData) => {

    const token = JSON.parse(localStorage.getItem("@token"));
    try {
      const { data } = await api.get(`/usuario/${formData.cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBuscarCadastro(true);
      setInputValue(data.nome);
      setUsuario(data);
    } catch (error) {
      toast.error("CPF Inválido!");
    }

  };

  const deletarUsuario = async () => {
    const token = JSON.parse(localStorage.getItem("@token"));
   
    try {
      await api.delete(`/usuario/${usuario.cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
    } catch (error) {
      toast.error("Usuario não deletado");
    }

    setBuscarCadastro(false);
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
            <button className={style.button_deletar} onClick={() => deletarUsuario()}><FaRegTrashAlt /></button>
          </div>
        </li>
      </ul> : null}
    </>
  )
};