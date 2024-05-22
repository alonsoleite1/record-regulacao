import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm, useFieldArray } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";
import { useState } from "react";


export const Profissionais = () => {
    const [abrirCadastro, setAbrirCadastro] = useState(false);
    const [buscarCadastro, setBuscarCadastro] = useState(false);

    const { register, control, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            specialties: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "specialties"
    });

    const addSpecialty = () => {
        const selectedSpecialty = getValues("selectedSpecialty");
        if (selectedSpecialty && !fields.some(field => field.name === selectedSpecialty)) {
            append({ name: selectedSpecialty });
            setValue("selectedSpecialty", "");
        }
    };

    const especialidade = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' }
      ];

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
                    <h1 className={style.title}>Profissionais</h1>
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
                        <p>Alonso Araujo Leite</p>
                        <button className={style.button_atualizar} onClick={() => cadastrar()}>Atualizar</button>
                    </li>
                </ul> : null}

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
                            <label className={style.label} htmlFor="cpf">CPF:</label>
                            <InputMask className={style.input_form}
                                mask="999.999.999-99"
                                {...register('cpf', { required: 'CPF é obrigatório' })}
                                onChange={(e) => setValue('cpf', e.target.value)}
                            />
                            {errors.cpf && <p className={style.aviso}>{errors.cpf.message}</p>}
                        </div>
                    </div>
                    <div className={style.box_especialidade}>
                        <div className={style.box_input}>
                            <label className={style.label}>Especialidade:</label>
                            <select className={style.input_form} {...register("selectedSpecialty",{required: 'Especialidade e obrigatória'})}>
                                <option value="">Selecione uma especialidade</option>
                                <option value="Cardiologia">Cardiologia</option>
                                <option value="Dermatologia">Dermatologia</option>
                                <option value="Neurologia">Neurologia</option>
                                <option value="Ortopedia">Ortopedia</option>
                                <option value="Pediatria">Pediatria</option>
                                {/* Adicione mais opções conforme necessário */}
                            </select>
                            <button className={style.button_cadastrar} type="button" onClick={addSpecialty}>
                            Adicionar
                            </button>
                            {errors.selectedSpecialty && <span className={style.aviso}>{errors.selectedSpecialty.message}</span>}
                        </div>

                        <div className={style.div_ul}>
                            <ul>
                                {fields.map((item, index) => (
                                    <li key={item.id}>
                                        {item.name}
                                        <button type="button" onClick={() => remove(index)}>Remover</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    <button className={style.button_salvar} type="submit"><RiSave3Fill /> Salvar profissional</button>
                </form> : null}

            </section>
        </DefaultTemplate>
    )
};