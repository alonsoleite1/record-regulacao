import { useEffect, useState } from "react";
import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import style from "./style.module.scss";



export const CriarAgenda = () => {
    const [unidades, setUnidades] = useState([]);
    const [profissionais, setProfissionais] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const buscaAPI = async () => {
            const { data } = await api.get('/unidade');
            setUnidades(data);

            const response = await api.get('/profissional');

            setProfissionais(response.data);
        };

        buscaAPI();

    }, []);

    const onSubmit = async (formData) => {

        console.log(formData);
        const token = JSON.parse(localStorage.getItem("@token"));

        try {
            const { data } = await api.post("/agenda", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Agenda criada com sucesso!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Criar Agenda</h1>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.box_cadastro}>
                        <div className={style.box_input}>
                            <label className={style.label}>Unidade:</label>
                            <select className={style.input} {...register("unidade", { required: "Selecione uma unidade" })}>
                                <option value="">Selecione...</option>
                                {unidades.map((option, i) => (
                                    <option key={i} value={option.nome}>
                                        {option.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.unidade && <span className={style.aviso}>{errors.unidade.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Profissional:</label>
                            <select className={style.input} {...register("nomeProfissional", { required: "Selecione um profissional" })}>
                                <option value="">Selecione...</option>
                                {profissionais.map((option, i) => (
                                    <option key={i} value={option.nome}>
                                        {option.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.profissional && <span className={style.aviso}>{errors.profissional.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Quantidade:</label>
                            <input className={style.input}
                                type="number"
                                {...register("quantidade", { required: "Informe a quantidade", min: { value: 1, message: "A quantidade deve ser no mínimo 1" } })}
                            />
                            {errors.quantidade && <span className={style.aviso}>{errors.quantidade.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Data:</label>
                            <input className={style.input}
                                type="date"
                                {...register("data", { required: "Informe a data" })}
                            />
                            {errors.data && <span className={style.aviso}>{errors.data.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Hora:</label>
                            <input className={style.input}
                                type="time"
                                {...register("hora", { required: "Informe a hora" })}
                            />
                            {errors.hora && <span className={style.aviso}>{errors.hora.message}</span>}
                        </div>
                    </div>

                    <button className={style.button_salvar} type="submit"><RiSave3Fill /> Criar Agenda</button>
                </form>
            </section>
        </DefaultTemplate>
    )
};

