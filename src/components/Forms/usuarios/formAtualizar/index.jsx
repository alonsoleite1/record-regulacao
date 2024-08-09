import React, { useEffect } from 'react';
import { useForm, } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';


export const AtualizarCadastro = ({ unidades, usuario, setAtualizar }) => {


    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    useEffect(() => {

        const carregaDados = () => {
            setValue('nome', usuario.nome);
            setValue('login', usuario.login);
            setValue('unidade', usuario.unidade);
            setValue('perfil', usuario.perfil);

        };

        carregaDados();;

    }, [setValue]);

    const onSubmit = async (payload) => {
        const token = JSON.parse(localStorage.getItem("@token"));

        try {
            const { data } = await api.patch(`usuario/${payload.cpf}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAtualizar(false)
            toast.success("Cadastro atualizado!");
        } catch (error) {
            toast.error("Não foi possivel atualizar!");
        }
    };

    const senha = watch('senha', '');

    return (

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.container}>
                <div className={style.box_input}>
                    <label className={style.label}>Nome:</label>
                    <input className={style.input}
                        {...register('nome', { required: 'Nome é obrigatório' })}
                    />
                    {errors.nome && <span className={style.aviso}>{errors.nome.message}</span>}
                </div>
                <div className={style.box_input}>
                    <label className={style.label}>CPF:</label>
                    <input type="text" className={style.input_cpf}
                        {...register('cpf', { required: 'CPF é obrigatório' })}
                        value={usuario.cpf} />
                </div>
                <div className={style.box_input}>
                    <label className={style.label}>Login:</label>
                    <input className={style.input}
                        {...register('login', { required: 'Login é obrigatório' })}
                    />
                    {errors.login && <span className={style.aviso}>{errors.login.message}</span>}
                </div>
                <div className={style.box_input}>
                    <label className={style.label}>Senha:</label>
                    <input className={style.input}
                        type="password"
                        {...register('senha', { required: 'Senha é obrigatória' })}
                    />
                    {errors.senha && <span className={style.aviso}>{errors.senha.message}</span>}
                </div>
                <div className={style.box_input}>
                    <label className={style.label}>Confirmação de Senha:</label>
                    <input className={style.input}
                        type="password"
                        {...register('confirmacaoSenha', {
                            required: 'Confirmação de Senha é obrigatória',
                            validate: (value) =>
                                value === senha || 'As senhas não correspondem'
                        })}
                    />
                    {errors.confirmacaoSenha && <span className={style.aviso}>{errors.confirmacaoSenha.message}</span>}
                </div>
                <div className={style.box_input}>
                    <label className={style.label}>Unidade:</label>
                    <select className={style.input}  {...register('unidade', { required: 'Unidade é obrigatório' })}
                    ><option value={usuario.unidade}>{usuario.unidade}</option>
                        {unidades.map((option, i) => (
                            <option key={i} value={option.nome}>
                                {option.nome}
                            </option>
                        ))}
                    </select>
                    {errors.unidade && <span className={style.aviso}>{errors.unidade.message}</span>}
                </div>
                <div className={style.box_input}>
                    <label className={style.label}>Perfil:</label>
                    <select className={style.input}  {...register('perfil', { required: 'Perfil é obrigatório' })}>
                        <option value="admin">Admin</option>
                        <option value="operador">Operador</option>
                        <option value="gerencia">Gerencia</option>
                    </select>
                    {errors.perfil && <span className={style.aviso}>{errors.perfil.message}</span>}
                </div>
            </div>
            <button className={style.button} type="submit"><RiSave3Fill /> Atualizar cadastro</button>
        </form>
    );
};
