import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { RiSave3Fill } from "react-icons/ri";
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
                        <button className={style.button_atualizar} onClick={() => cadastrar()}>Atualizar</button>
                    </li>
                </ul> : null}

                {abrirCadastro ?  <form className={style.form_cadastro} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.box_cadastro}>
          <div className={style.box_input}>
            <label className={style.label}>Rua:</label>
            <input className={style.input_form}
              {...register('street', { required: 'Rua é obrigatória' })}
            />
            {errors.street && <span className={style.aviso}>{errors.street.message}</span>}
          </div>
          <div className={style.box_input}>
            <label className={style.label}>Número:</label>
            <input className={style.input_form}
              type="number"
              {...register('number', { required: 'Número é obrigatório' })}
            />
            {errors.number && <span className={style.aviso}>{errors.number.message}</span>}
          </div>
          <div className={style.box_input}>
            <label className={style.label}>Cidade:</label>
            <input className={style.input_form}
              {...register('city', { required: 'Cidade é obrigatória' })}
            />
            {errors.city && <span className={style.aviso}>{errors.city.message}</span>}
          </div>
          <div className={style.box_input}>
            <label className={style.label}>Estado:</label>
            <input className={style.input_form}
              {...register('state', { required: 'Estado é obrigatório' })}
            />
            {errors.state && <span className={style.aviso}>{errors.state.message}</span>}
          </div>
          <div className={style.box_input}>
            <label className={style.label}>CEP:</label>
            <InputMask className={style.input_form}
              mask="99999-999"
              {...register('zipCode', {
                required: 'CEP é obrigatório',
                validate: value => /^[0-9]{5}-[0-9]{3}$/.test(value) || 'CEP inválido'
              })}
            >
              {(inputProps) => <input {...inputProps} />}
            </InputMask>
            {errors.zipCode && <span className={style.aviso}>{errors.zipCode.message}</span>}
          </div>
      </div>

      <button className={style.button_salvar} type="submit"><RiSave3Fill /> Cadastrar</button>
    </form>: null}

            </section>
        </DefaultTemplate>
    )
};