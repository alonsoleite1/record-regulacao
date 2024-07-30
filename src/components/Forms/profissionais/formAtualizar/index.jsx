import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from "./style.module.scss";


export const AtualizarProfissional = ({ profissional, especialidades }) => {

  const navigate = useNavigate();

  const { register, control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specialties"
  });

  const addSpecialty = () => {
    const especialidade = getValues("especialidade");
    if (especialidade && !fields.some(field => field.name === especialidade)) {
      append({ name: especialidade });

    }
  };

  useEffect(() => {

    const carregaDados = () => {
      setValue('nome', profissional.nome);

    };

    carregaDados();

  }, [setValue]);


  const onSubmit = async (formData) => {
    const token = JSON.parse(localStorage.getItem("@token"));

    let arrayEspecialidades = [];

        formData.specialties.map((element) => arrayEspecialidades.push(element.name));

        const payloand = { nome: formData.nome, cpf: formData.cpf, especialidade: arrayEspecialidades };

    try {
      const { data } = await api.patch(`profissional/${payloand.cpf}`, payloand, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.reload();
      toast.success("Cadastro atualizado!");
    } catch (error) {
      toast.error("Não foi possivel atualizar!");
    }
  };


  return (

    <form className={style.form_cadastro} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.box_cadastro}>
        <div className={style.box_input}>
          <label className={style.label}>Nome:</label>
          <input
            className={style.input_form}
            {...register('nome', { required: 'Nome é obrigatório' })}
          />
          {errors.nome && <p className={style.aviso}>{errors.nome.message}</p>}
        </div>
        <div className={style.box_input}>
          <label className={style.label}>CPF:</label>

          <input type="text" className={style.input_cpf}
            value={profissional.cpf} {...register("cpf")} />
          {errors.cpf && <span className={style.aviso}>{errors.cpf.message}</span>}
        </div>
      </div>
      <div className={style.box_especialidade}>
        <div className={style.box_select}>
          <div className={style.box_select}>
            <label className={style.label}>Especialidade:</label>
            <select className={style.input_form} {...register("especialidade")}>
              <option value="">Selecione uma especialidade</option>
              {especialidades.map((option, i) => (
                <option key={i} value={option.nome}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button className={style.button_cadastrar} type="button" onClick={addSpecialty}>
            Adicionar
          </button>

        </div>

        <ul className={style.ul_especialidade}>
          {fields.map((item, index) => (
            <li className={style.card} key={item.id}>
              {item.name}
              <button className={style.button_deletar} type="button" onClick={() => remove(index)}><FaRegTrashAlt /></button>
            </li>
          ))}
        </ul>

      </div>
      <button className={style.button_salvar} type="submit"><RiSave3Fill /> Atualizar cadastro</button>
    </form>
  );
};
