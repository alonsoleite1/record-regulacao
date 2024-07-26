import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { api } from "../../../services/api";
import { toast } from 'react-toastify';
import style from "./style.module.scss";



export const GerarListaDeEspera = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const [especialidade, setEspecialidade] = useState([]);

    const onSubmit = async (payloand) => {
       
        const token = JSON.parse(localStorage.getItem("@token"));

        try {
            const { data } = await api.get(`/gerar?espera=${payloand.espera}&regulacao=${payloand.regulacao}&classificacao=${payloand.classificacao}&quantidade=${payloand.quantidade}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data);
        } catch (error) {
            toast.error(error);
        }
        // Aqui você pode enviar os dados para um servidor, por exemplo
    };

    const handleSelectChange = async (e) => {
        const selectedValue = e.target.value;

        const token = JSON.parse(localStorage.getItem("@token"));
        try {
            const { data } = await api.get(`/${selectedValue}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEspecialidade(data);

        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Gerar lista de espera</h1>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.box_cadastro}>

                        <div className={style.box_input}>
                            <label className={style.label}>Serviço:</label>
                            <select className={style.input} {...register('servico', { required: 'Serviço é obrigatório' })} onChange={handleSelectChange} >
                                <option value="">Selecione um serviço</option>
                                <option value="especialista">Especialista</option>
                                <option value="cirugia">Cirugia</option>
                                <option value="exame">Exame/Procedimento</option>
                            </select>
                            {errors.servico && <span className={style.aviso}>{errors.servico.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Especialidade:</label>
                            <select className={style.input} {...register('espera', { required: 'Especialidade é obrigatória' })}>
                                <option value="">Selecione uma especialidade</option>
                                {especialidade.map((option, i) => (
                                    <option key={i} value={option.nome}>
                                        {option.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.espera && <span className={style.aviso}>{errors.espera.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Regulaçao:</label>
                            <select className={style.input} {...register('regulacao', { required: 'Regulação é obrigatória' })}>
                                <option value="">Selecione uma regulação</option>
                                <option value="sede">Sede</option>
                                <option value="nasf">Nasf</option>
                            </select>
                            {errors.regulacao && <span className={style.aviso}>{errors.regulacao.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Classificação:</label>
                            <select className={style.input} {...register('classificacao', { required: 'Classificação é obrigatória' })}>
                                <option value="">Selecione uma classificação</option>
                                <option value="normal">Normal</option>
                                <option value="urgente">Urgente</option>
                            </select>
                            {errors.classificacao && <span className={style.aviso}>{errors.classificacao.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Quantidade:</label>
                            <input className={style.input}
                                type="number"
                                {...register("quantidade", { required: "Informe a quantidade", min: { value: 1, message: "A quantidade deve ser no mínimo 1" } })}
                            />
                            {errors.quantidade && <span className={style.aviso}>{errors.quantidade.message}</span>}
                        </div>

                    </div>

                    <button className={style.button_salvar} type="submit"> Gerar Lista</button>
                </form>

            </section>
        </DefaultTemplate>
    )
};