import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { RiSave3Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "./style.module.scss";
import { useState } from "react";


export const Pacientes = () => {
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
            <section className={style.section}>
                <div className={style.header}>
                    <h1 className={style.title}>Pacientes</h1>
                    <div className={style.div_button}>
                        <button className={style.button_cadastrar} onClick={() => cadastrar()}>+ Cadastrar</button>
                    </div>
                </div>
                <form className={style.form_buscar}>
                    <input className={style.input_buscar} type="text" />
                    <button className={style.button_buscar} type="submit" onClick={() => atualizar()}>Buscar</button>
                </form>

                {buscarCadastro ? <ul className={style.ul}>
                    <li className={style.card}>
                        <p>Alonso Araujo Leite</p>
                        <div className={style.div_button}>
                            <button className={style.button_atualizar} onClick={() => cadastrar()}>Atualizar</button>
                            <button className={style.button_deletar}><FaRegTrashAlt /></button>
                        </div>
                    </li>
                </ul> : null}

                {abrirCadastro ? <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.container}>
                        <div className={style.box_input}>
                            <label className={style.label}>Nome</label>
                            <input className={style.input} {...register('nome', { required: 'Nome é obrigatório' })} />
                            {errors.nome && <span className={style.aviso}>{errors.nome.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Data de Nascimento</label>
                            <InputMask className={style.input}
                                mask="99/99/9999"
                                {...register('dataNascimento', { required: 'Data de Nascimento é obrigatória' })}
                            />
                            {errors.dataNascimento && <span className={style.aviso}>{errors.dataNascimento.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Nome da Mãe</label>
                            <input className={style.input} {...register('nomeMae', { required: 'Nome da Mãe é obrigatório' })} />
                            {errors.nomeMae && <span className={style.aviso}>{errors.nomeMae.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>CPF</label>
                            <InputMask className={style.input}
                                mask="999.999.999-99"
                                {...register('cpf', { required: 'CPF é obrigatório' })}
                            />
                            {errors.cpf && <span className={style.aviso}>{errors.cpf.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>CNS</label>
                            <InputMask className={style.input}
                                mask="999 9999 9999 9999"
                                {...register('cns', { required: 'CNS é obrigatório' })}
                            />
                            {errors.cns && <span className={style.aviso}>{errors.cns.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Rua:</label>
                            <input className={style.input}
                                {...register('rua', { required: 'Rua é obrigatória' })}
                            />
                            {errors.rua && <span className={style.aviso}>{errors.rua.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Número:</label>
                            <input className={style.input}
                                type="number"
                                {...register('numero', { required: 'Número é obrigatório' })}
                            />
                            {errors.numero && <span className={style.aviso}>{errors.numero.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Bairro:</label>
                            <input className={style.input}
                                {...register('bairro', { required: 'Bairro é obrigatória' })}
                            />
                            {errors.bairro && <span className={style.aviso}>{errors.bairro.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Cidade:</label>
                            <input className={style.input}
                                {...register('cidade', { required: 'Cidade é obrigatória' })}
                            />
                            {errors.cidade && <span className={style.aviso}>{errors.cidade.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Estado:</label>
                            <input className={style.input}
                                {...register('estado', { required: 'Estado é obrigatório' })}
                            />
                            {errors.estado && <span className={style.aviso}>{errors.estado.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>CEP:</label>
                            <InputMask className={style.input}
                                mask="99999-999"
                                {...register('cep', {
                                    required: 'CEP é obrigatório',
                                    validate: value => /^[0-9]{5}-[0-9]{3}$/.test(value) || 'CEP inválido'
                                })}
                            >
                                {(inputProps) => <input {...inputProps} />}
                            </InputMask>
                            {errors.cep && <span className={style.aviso}>{errors.cep.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Posto de Saúde:</label>
                            <input className={style.input} {...register('postoSaude', { required: 'Posto de Saúde é obrigatório' })} />
                            {errors.postoSaude && <span className={style.aviso}>{errors.postoSaude.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>ACS:</label>
                            <input className={style.input} {...register('acs', { required: 'ACS é obrigatório' })} />
                            {errors.acs && <span className={style.aviso}>{errors.acs.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Contato 1</label>
                            <InputMask className={style.input}
                                mask="(99) 99999-9999"
                                {...register('contato1', { required: 'Contato 1 é obrigatório' })}
                            />
                            {errors.contato1 && <span className={style.aviso}>{errors.contato1.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Contato 2</label>
                            <InputMask className={style.input}
                                mask="(99) 99999-9999"
                                {...register('contato2', { required: 'Contato 2 é obrigatório' })}
                            />
                            {errors.contato2 && <span className={style.aviso}>{errors.contato2.message}</span>}
                        </div>
                    </div>

                    <button className={style.button} type="submit"><RiSave3Fill /> Salvar paciente</button>
                </form> : null}

            </section>
        </DefaultTemplate>
    )
};