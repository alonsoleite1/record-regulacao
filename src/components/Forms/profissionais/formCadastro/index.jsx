import { DefaultTemplate } from "../../../DefaultTemplate";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { RiSave3Fill } from "react-icons/ri";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FormPesquisaProfissional } from '../formBusca';
import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import style from "./style.module.scss";


export const Profissionais = () => {
    const [abrirCadastro, setAbrirCadastro] = useState(false);
    const [buscarCadastro, setBuscarCadastro] = useState(false);
    const [atualizar, setAtualizar] = useState(false);
    const [especialidades, setEspecialidades] = useState([]);


    const navigate = useNavigate();

    const handleChange = (e) => {
        const valor = e.target.value.replace(/[.-]/g, '');
        setValue('cpf', valor);
    };

    const cadastrar = async () => {
        setBuscarCadastro(false);
        setAbrirCadastro(true);
        setAtualizar(false);

        const arrayEspecialidades = [];

        const exames = await api.get('/exame');

        if (exames.data) {
            exames.data.map((element) => arrayEspecialidades.push(element.nome));
        };

        const especialistas = await api.get('/especialista');
        if (especialistas.data) {
            especialistas.data.map((element) => arrayEspecialidades.push(element.nome));
        };

        const cirurgias = await api.get('/cirugia');
        if (cirurgias.data) {
            cirurgias.data.map((element) => arrayEspecialidades.push(element.nome));
        };


        setEspecialidades(arrayEspecialidades);

    };

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

    const onSubmit = async (formData) => {
        const token = JSON.parse(localStorage.getItem("@token"));
        let arrayEspecialidades = [];

        formData.specialties.map((element) => arrayEspecialidades.push(element.name));

        const payloand = { nome: formData.nome, cpf: formData.cpf, especialidade: arrayEspecialidades };

        try {
            const { data } = await api.post("/profissional", payloand, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Profissional criado com sucesso!");
            setAbrirCadastro(false);
            window.location.reload();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Profissionais</h1>
                    <div className={style.div_button}>
                        <button className={style.button_cadastrar} onClick={() => cadastrar()}>+ Cadastrar</button>
                    </div>
                </div>

                <FormPesquisaProfissional buscarCadastro={buscarCadastro} atualizar={atualizar} setAtualizar={setAtualizar} setBuscarCadastro={setBuscarCadastro} setAbrirCadastro={setAbrirCadastro} />

                {abrirCadastro ? <form className={style.form_cadastro} onSubmit={handleSubmit(onSubmit)}>
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
                                        {(inputProps) => <input className={style.input_form} {...inputProps} type="text" />}
                                    </InputMask>
                                )}
                            />
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
                    <button className={style.button_salvar} type="submit"><RiSave3Fill /> Salvar profissional</button>
                </form> : null}

            </section>
        </DefaultTemplate>
    )
};