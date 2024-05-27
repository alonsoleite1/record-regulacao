import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import style from "./style.module.scss";
import { useState } from "react";



export const DashboardRealizadas = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Aqui você pode enviar os dados para um servidor, por exemplo
    };


    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Dashboard Realizadas</h1>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.box_cadastro}>

                        <div className={style.box_input}>
                            <label className={style.label}>Data de início:</label>
                            <input className={style.input}
                                type="date"
                                {...register("dataInicio", { required: "Informe a data" })}
                            />
                            {errors.dataInicio && <span className={style.aviso}>{errors.dataInicio.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Data final:</label>
                            <input className={style.input}
                                type="date"
                                {...register("dataFinal", { required: "Informe a data" })}
                            />
                            {errors.dataFinal && <span className={style.aviso}>{errors.dataFinal.message}</span>}
                        </div>

                    </div>

                    <button className={style.button_salvar} type="submit"> Gerar Dashboard</button>
                </form>
            
                <section className={style.especialidade}>
                    <h1 className={style.title}>Especialidade</h1>
                    <div className={style.card}>
                        <h3 className={style.label}>Cardiologia</h3>
                        <p className={style.quantidade}>20</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Cirurgião Geral</h3>
                        <p className={style.quantidade}>30</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Clinica Médica</h3>
                        <p className={style.quantidade}>50</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Dermatologia</h3>
                        <p className={style.quantidade}>50</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Endocrinologia</h3>
                        <p className={style.quantidade}>30</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Urologista</h3>
                        <p className={style.quantidade}>50</p>

                    </div>
                </section>

                <section className={style.especialidade}>
                    <h1 className={style.title}>Exames e Procedimentos</h1>
                    <div className={style.card}>
                        <h3 className={style.label}>ECG sem laudo</h3>
                        <p className={style.quantidade}>20</p>
                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Endoscopia</h3>
                        <p className={style.quantidade}>30</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>ECG com laudo</h3>
                        <p className={style.quantidade}>50</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>USG do Olho</h3>
                        <p className={style.quantidade}>30</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Ultrassom da mão</h3>
                        <p className={style.quantidade}>30</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Ultrassom de articulação</h3>
                        <p className={style.quantidade}>50</p>

                    </div>
                </section>

                <section className={style.especialidade}>
                    <h1 className={style.title}>Cirurgias</h1>
                    <div className={style.card}>
                        <h3 className={style.label}>Oftalmológica</h3>
                        <p className={style.quantidade}>20</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Cirugião Geral</h3>
                        <p className={style.quantidade}>30</p>

                    </div>
                    <div className={style.card}>
                        <h3 className={style.label}>Cirurgia ginecológica</h3>
                        <p className={style.quantidade}>50</p>

                    </div>
                </section>

            </section>

        </DefaultTemplate>
    )
};