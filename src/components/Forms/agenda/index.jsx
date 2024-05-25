import { DefaultTemplate } from "../../DefaultTemplate";
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";



export const Agendar = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Aqui você pode enviar os dados para um servidor, por exemplo
    };

    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Agenda</h1>
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
                            <label className={style.label}>Profissional:</label>
                            <select className={style.input} {...register('profissional', { required: 'Profissional é obrigatório' })}>
                                <option value="">Selecione um profissional</option>
                                <option value="profissional1">Profissional 1</option>
                                <option value="profissional2">Profissional 2</option>
                            </select>
                            {errors.profissional && <span className={style.aviso}>{errors.profissional.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Data:</label>
                            <select className={style.input} {...register('data', { required: 'Data é obrigatório' })}>
                                <option value="">Selecione uma data</option>
                                <option value="profissional1">25/01/2024</option>
                                <option value="profissional2">26/01/2024</option>
                            </select>
                            {errors.data && <span className={style.aviso}>{errors.data.message}</span>}
                        </div>
                    </div>

                    <button className={style.button_salvar} type="submit"> <RiSave3Fill />Agendar</button>
                </form>

            </section>
        </DefaultTemplate>
    )
};