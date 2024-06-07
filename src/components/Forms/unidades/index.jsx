import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "./style.module.scss";
import { useState } from "react";


export const Unidades = () => {
  const [abrirCadastro, setAbrirCadastro] = useState(false);
  const [buscarCadastro, setBuscarCadastro] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const cadastrar = () => {
    return setAbrirCadastro(true);
  };
  const atualizar = () => {
    event.preventDefault()
    return setBuscarCadastro(true);
  };

  return (
    <DefaultTemplate>
      <section className={style.container}>
        <div className={style.header}>
          <h1 className={style.title}>Unidades</h1>
          <div className={style.div_button}>
            <button className={style.button_cadastrar} onClick={() => cadastrar()}>+ Cadastrar</button>
          </div>
        </div>
        <form className={style.form_buscar}>
          <input className={style.input} type="text" />
          <button className={style.button_buscar} type="submit" onClick={() => atualizar()}>Buscar</button>
        </form>

        {buscarCadastro ? <ul className={style.ul}>
          <li className={style.card}>
            <p>UBS Parque Aratanha</p>
            <div className={style.div_button}>
              <button className={style.button_atualizar} onClick={() => cadastrar()}>Atualizar</button>
              <button className={style.button_deletar}><FaRegTrashAlt /></button>
            </div>
          </li>
        </ul> : null}

        {abrirCadastro ? <form className={style.form_cadastro} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.box_cadastro}>
          <div className={style.box_input}>
              <label className={style.label}>Nome:</label>
              <input className={style.input_form}
                {...register('nome', { required: 'Nome é obrigatório' })}
              />
              {errors.nome && <span className={style.aviso}>{errors.nome.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Rua:</label>
              <input className={style.input_form}
                {...register('rua', { required: 'Rua é obrigatória' })}
              />
              {errors.rua && <span className={style.aviso}>{errors.rua.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Número:</label>
              <input className={style.input_form}
                type="number"
                {...register('numero', { required: 'Número é obrigatório' })}
              />
              {errors.numero && <span className={style.aviso}>{errors.numero.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Bairro:</label>
              <input className={style.input_form}
                type="number"
                {...register('bairro', { required: 'Bairro é obrigatório' })}
              />
              {errors.bairro && <span className={style.aviso}>{errors.bairro.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Cidade:</label>
              <input className={style.input_form}
                {...register('cidade', { required: 'Cidade é obrigatória' })}
              />
              {errors.cidade && <span className={style.aviso}>{errors.cidade.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Estado:</label>
              <input className={style.input_form}
                {...register('estado', { required: 'Estado é obrigatório' })}
              />
              {errors.estado && <span className={style.aviso}>{errors.estado.message}</span>}
            </div>
       
          </div>

          <button className={style.button_salvar} type="submit"><RiSave3Fill /> Cadastrar</button>
        </form> : null}

      </section>
    </DefaultTemplate>
  )
};