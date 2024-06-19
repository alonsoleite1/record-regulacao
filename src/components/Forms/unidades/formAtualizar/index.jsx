import React from 'react';
import { useForm } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const AtualizarUnidade = ({ unidade}) => {

    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (payload) => {
        const token = JSON.parse(localStorage.getItem("@token"));

        try {
            const { data } = await api.patch(`unidade/${payload.nome}`,payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/dashboard");
            toast.success("Cadastro atualizado!");
        } catch (error) {
            toast.error("Não foi possivel atualizar!");
        }
    };


    return (

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.container}>
          <div className={style.box_input}>
            <label className={style.label}>Nome:</label>
            <input className={style.input_nome}
            value={unidade.nome}
              {...register('nome', { required: 'Nome é obrigatório' })}
            />
            {errors.nome && <span className={style.aviso}>{errors.nome.message}</span>}
          </div>
          
          <div className={style.box_input}>
            <label className={style.label}>Rua:</label>
            <input className={style.input}
            placeholder={unidade.rua}
              {...register('rua', { required: 'Rua é obrigatório' })}
            />
            {errors.rua && <span className={style.aviso}>{errors.rua.message}</span>}
          </div>

          <div className={style.box_input}>
            <label className={style.label}>Número:</label>
            <input className={style.input}
            placeholder={unidade.numero}
              {...register('numero', { required: 'Número é obrigatório' })}
            />
            {errors.numero && <span className={style.aviso}>{errors.numero.message}</span>}
          </div>
         
          <div className={style.box_input}>
            <label className={style.label}>Bairro:</label>
            <input className={style.input}
            placeholder={unidade.bairro}
              {...register('bairro', { required: 'Bairro é obrigatório' })}
            />
            {errors.bairro && <span className={style.aviso}>{errors.bairro.message}</span>}
          </div>

          <div className={style.box_input}>
            <label className={style.label}>Cidade:</label>
            <input className={style.input}
            placeholder={unidade.cidade}
              {...register('cidade', { required: 'Cidade é obrigatório' })}
            />
            {errors.cidade && <span className={style.aviso}>{errors.cidade.message}</span>}
          </div>

          <div className={style.box_input}>
            <label className={style.label}>Estado:</label>
            <input className={style.input}
            placeholder={unidade.estado}
              {...register('estado', { required: 'Estado é obrigatório' })}
            />
            {errors.estado && <span className={style.aviso}>{errors.estado.message}</span>}
          </div>
          
        </div>
        <button className={style.button} type="submit"><RiSave3Fill /> Atualizar unidade</button>
      </form>
    );
};
