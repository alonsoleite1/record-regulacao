import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "./style.module.scss";
import { useState } from "react";


export const Especialidades = () => {
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
                    <h1 className={style.title}>Especialidades</h1>
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
                        <p>Cirurgião Geral</p>
                        <div className={style.div_button}>
                            <button className={style.button_atualizar} onClick={() => cadastrar()}>Atualizar</button>
                            <button className={style.button_deletar}><FaRegTrashAlt /></button>
                        </div>
                    </li>
                </ul> : null}

                {abrirCadastro ? <form className={style.form_cadastro} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.box_cadastro}>
                        <div className={style.box_input}>
                            <label className={style.label}>Especialidade:</label>
                            <input className={style.input_form}
                                {...register('especialidade', { required: 'Especialidade é obrigatória' })}
                            />
                            {errors.especialidade && <span className={style.aviso}>{errors.especialidade.message}</span>}
                        </div>
                    </div>

                    <button className={style.button_salvar} type="submit"><RiSave3Fill /> Cadastrar</button>
                </form> : null}

            </section>
        </DefaultTemplate>
    )
};