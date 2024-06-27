import { DefaultTemplate } from "../../DefaultTemplate";
import { useState } from "react";
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import { api } from "../../../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from "./style.module.scss";



export const ListaDeEspera = () => {

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();

    const [lista, setLista] = useState([]);

    const handleChange = (e) => {
        const valor = e.target.value.replace(/[.-]/g, '');
        setValue('cpf', valor);
      };

    const onSubmit = async (payloand) => {
        const token = JSON.parse(localStorage.getItem("@token"));     

        try {
            const { data } = await api.post("/lista", payloand, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Adicionado a lista com sucesso!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response.data.message);
        }
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

            setLista(data);

        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Lista de espera</h1>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

                    <div className={style.box_cadastro}>
                        <div className={style.box_input}>
                            <label className={style.label}>CPF:</label>
                            <Controller
                                name="cpf"
                                control={control}
                                rules={{ required: 'CPF é obrigatório' }}
                                render={({ field }) => (
                                    <InputMask
                                    mask="999.999.999-99"
                                    value={field.value}
                                    onChange={handleChange}
                                    >
                                        {(inputProps) => <input className={style.input} {...inputProps} type="text" />}
                                    </InputMask>
                                )}
                            />
                            {errors.cpf && <span className={style.aviso}>{errors.cpf.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Serviço:</label>
                            <select className={style.input} {...register('servico', { required: 'Serviço é obrigatório' })} onChange={handleSelectChange}>
                                <option value="">Selecione um serviço</option>
                                <option value="especialista">Especialista</option>
                                <option value="cirugia">Cirugia</option>
                                <option value="exame">Exame/Procedimento</option>
                            </select>
                            {errors.servico && <span className={style.aviso}>{errors.servico.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Especialidade:</label>
                            <select className={style.input} {...register('especialidade', { required: 'Especialidade é obrigatória' })}>
                                <option value="">Selecione uma especialidade</option>
                                {lista.map((option, i) => (
                                    <option key={i} value={option.nome}>
                                        {option.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.especialidade && <span className={style.aviso}>{errors.especialidade.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Classificação:</label>
                            <select className={style.input} {...register('classificacao', { required: 'Classificação é obrigatória' })}>
                                <option value="">Selecione a classificação</option>
                                <option value="normal">Normal</option>
                                <option value="urgente">Urgente</option>
                            </select>
                            {errors.classificacao && <span className={style.aviso}>{errors.classificacao.message}</span>}
                        </div>

                    </div>

                    <button className={style.button_salvar} type="submit"> <RiSave3Fill />Adicionar</button>
                </form>

            </section>
        </DefaultTemplate>
    )
};