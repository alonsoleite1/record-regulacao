import { DefaultTemplate } from "../../DefaultTemplate";
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";



export const ListaDeEspera = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Aqui você pode enviar os dados para um servidor, por exemplo
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
                                        onChange={field.onChange}
                                    >
                                        {(inputProps) => <input className={style.input} {...inputProps} type="text" />}
                                    </InputMask>
                                )}
                            />
                            {errors.cpf && <span className={style.aviso}>{errors.cpf.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Serviço:</label>
                            <select className={style.input} {...register('servico', { required: 'Serviço é obrigatório' })}>
                                <option value="">Selecione um serviço</option>
                                <option value="especialista">Especialista</option>
                                <option value="cirugia">Cirugia</option>
                                <option value="exameProcedimento">Exame/Procedimento</option>
                            </select>
                            {errors.servico && <span className={style.aviso}>{errors.servico.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Especialidade:</label>
                            <select className={style.input} {...register('especialidade', { required: 'Especialidade é obrigatória' })}>
                                <option value="">Selecione uma especialidade</option>
                                <option value="especialidade1">Especialidade 1</option>
                                <option value="especialidade2">Especialidade 2</option>
                            </select>
                            {errors.especialidade && <span className={style.aviso}>{errors.especialidade.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Classificação:</label>
                            <select className={style.input} {...register('classificacao', { required: 'Classificação é obrigatória' })}>
                                <option value="">Selecione uma especialidade</option>
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