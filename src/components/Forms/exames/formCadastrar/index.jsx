import { DefaultTemplate } from "../../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useState } from "react";
import { FormPesquisaExame } from "../formBusca";
import { api } from "../../../../services/api";
import style from "./style.module.scss";


export const Exames = () => {
    const [abrirCadastro, setAbrirCadastro] = useState(false);
    const [buscarCadastro, setBuscarCadastro] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {

        const token = JSON.parse(localStorage.getItem("@token"));

        try {
            const { data } = await api.post("/exame", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Exame/procedimento criado com sucesso!");
            setAbrirCadastro(false);
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    const cadastrar = () => {
        setBuscarCadastro(false);
        setAbrirCadastro(true);
    };

    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Exames & Procedimentos</h1>
                    <div className={style.div_button}>
                        <button className={style.button_cadastrar} onClick={() => cadastrar()}>+ Cadastrar</button>
                    </div>
                </div>

                <FormPesquisaExame buscarCadastro={buscarCadastro} setBuscarCadastro={setBuscarCadastro}/>

                {abrirCadastro ? <form className={style.form_cadastro} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.box_cadastro}>
                        <div className={style.box_input}>
                            <label className={style.label}>Especialidade:</label>
                            <input className={style.input_form}
                                {...register('nome', { required: 'Especialista é obrigatória' })}
                            />
                            {errors.nome && <span className={style.aviso}>{errors.nome.message}</span>}
                        </div>
                    </div>

                    <button className={style.button_salvar} type="submit"><RiSave3Fill /> Cadastrar</button>
                </form> : null}

            </section>
        </DefaultTemplate>
    )
};