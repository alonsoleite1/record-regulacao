import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from '../../../../services/api';
import style from "./style.module.scss";
import { AtualizarCadastro } from '../formAtualizar';


export const FormPesquisaUsuario = ({ buscarCadastro, atualizar, setAtualizar, setBuscarCadastro, setAbrirCadastro }) => {
  const [usuario, setUsuario] = useState("");
  const [unidades, setUnidades] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onSubmit = async (payloand) => {

    const token = JSON.parse(localStorage.getItem("@token"));
    try {
      const response = await api.get(`/usuario/${payloand.cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBuscarCadastro(true);
      setUsuario(response.data);
      setAtualizar(false);
      setAbrirCadastro(false);

    } catch (error) {
      toast.error(error.response.data.message);

    } finally {
      reset()
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

  const updateUsuario = async () => {
    setAtualizar(true);
    setBuscarCadastro(false)
    const { data } = await api.get('/unidade');

    setUnidades(data)
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
            value={usuario.nome} />
          <div className={style.div_button}>
            <button className={style.button_atualizar} onClick={() => updateUsuario()}>Atualizar</button>
            <button className={style.button_deletar} onClick={() => deletarUsuario()}><FaRegTrashAlt /></button>
          </div>
        </li>
      </ul> : null}
      {atualizar ? <AtualizarCadastro unidades={unidades} usuario={usuario} /> : null}
    </>
  )
};